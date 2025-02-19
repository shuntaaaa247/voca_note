import { Dispatch, SetStateAction } from "react"  
import { render, screen } from "@testing-library/react"
import { useParams } from "next/navigation"
import userEvent from "@testing-library/user-event"
import { CreateItemForm } from "@/components/note/CreateItemForm"
import { testItem1, testItem2 } from "@/__test__/testUtils/testData"
import { Item } from "../../../../../backend/generated/zod"
import { ItemsContext } from "@/components/note/TestNote"

const user = userEvent.setup()
const mockItems: Item[] = []
const mockSetItems = jest.fn((newItems: Item[]) => {
  mockItems.length = 0
  mockItems.push(...newItems)
})
global.fetch = jest.fn()
const mockSetModalIsOpen = jest.fn()
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: jest.fn(),
}));

describe("components/CreateItemForm.tsx", () => {
  test("最初のアイテムが作成できる", async () => {
    ;(useParams as jest.Mock).mockReturnValue({ categoryId: testItem1.categoryId })
    ;(global.fetch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          item: testItem1
        })
      })
    })
    // ItemsContextのProviderでラップする
    render(
      <ItemsContext.Provider value={{ items: mockItems, setItems: mockSetItems as Dispatch<SetStateAction<Item[] | undefined>> }}>
        <CreateItemForm setModalIsOpen={mockSetModalIsOpen} />
      </ItemsContext.Provider>
    )
    const wordInput = screen.getByPlaceholderText("Apple")
    const meaningInput = screen.getByPlaceholderText("リンゴ")
    const submitButton = screen.getByRole("button", {name: "保存"})
    await user.type(wordInput, testItem1.word)
    await user.type(meaningInput, testItem1.meaning)
    await user.click(submitButton)
    expect(mockSetItems).toHaveBeenCalledWith([testItem1]) // アイテムが追加されることを確認
    expect(mockSetItems).toHaveBeenCalledTimes(1) // アイテムが追加されることを確認
    expect(mockItems).toEqual([testItem1]) // アイテムが追加されることを確認
    expect(mockSetModalIsOpen).toHaveBeenCalledWith(false) // モーダルが閉じられることを確認
  })

  test("2つ目のアイテムが作成できる", async () => {
    ;(useParams as jest.Mock).mockReturnValue({ categoryId: testItem2.categoryId })
    ;(global.fetch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          item: testItem2
        })
      })
    })
    render(
      <ItemsContext.Provider value={{ items: mockItems, setItems: mockSetItems as Dispatch<SetStateAction<Item[] | undefined>> }}>
        <CreateItemForm setModalIsOpen={mockSetModalIsOpen} />
      </ItemsContext.Provider>
    )
    const wordInput = screen.getByPlaceholderText("Apple")
    const meaningInput = screen.getByPlaceholderText("リンゴ")
    const submitButton = screen.getByRole("button", {name: "保存"})
    await user.type(wordInput, testItem2.word)
    await user.type(meaningInput, testItem2.meaning)
    await user.click(submitButton)
    expect(mockSetItems).toHaveBeenCalledWith([testItem1, testItem2]) // アイテムが追加されることを確認
    expect(mockSetItems).toHaveBeenCalledTimes(2) // アイテムが追加されることを確認
    expect(mockItems).toEqual([testItem1, testItem2]) // アイテムが追加されることを確認
    expect(mockSetModalIsOpen).toHaveBeenCalledWith(false) // モーダルが閉じられることを確認
  })
})