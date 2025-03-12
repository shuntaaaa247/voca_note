import { Dispatch, SetStateAction, useState } from "react"  
import { useParams } from "next/navigation"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CreateItemForm } from "@/components/note/CreateItemForm"
import { testItems } from "@/__tests__/__utils__/testData"
import { Item } from "../../../../../backend/generated/zod"
import { ItemsContext } from "@/components/note/TestNote"

const user = userEvent.setup()

const mockItems: Item[] = []
const mockSetItems = jest.fn().mockImplementation((newItems: Item[]) => {
  mockItems.length = 0
  mockItems.push(...newItems)
})
global.fetch = jest.fn()
const mockSetModalIsOpen = jest.fn()

describe("components/CreateItemForm.tsx", () => {
  beforeEach(() => {
    // 各テストの前にモックをリセット
    mockSetItems.mockClear()
    mockSetModalIsOpen.mockClear()
  })

  test("最初のアイテムが作成できる", async () => {
    ;(useParams as jest.Mock).mockReturnValue({ categoryId: testItems[0].categoryId })
    ;(global.fetch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          item: testItems[0]
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
    await user.type(wordInput, testItems[0].word)
    await user.type(meaningInput, testItems[0].meaning)
    await user.click(submitButton)
    expect(mockSetItems).toHaveBeenCalledWith([testItems[0]]) // アイテムが追加されることを確認
    expect(mockSetItems).toHaveBeenCalledTimes(1) // アイテムが追加されることを確認
    expect(mockItems).toEqual([testItems[0]]) // アイテムが追加されることを確認
    expect(mockSetModalIsOpen).toHaveBeenCalledWith(false) // モーダルが閉じられることを確認
  })

  test("2つ目のアイテムが作成できる", async () => { // 2つ目のアイテムが作成できることを確認(「最初のアイテムが作成できる」のテストが通っていて、testItem1が追加されていることを前提とする)
    ;(useParams as jest.Mock).mockReturnValue({ categoryId: testItems[1].categoryId })
    ;(global.fetch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          item: testItems[1]
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
    await user.type(wordInput, testItems[1].word)
    await user.type(meaningInput, testItems[1].meaning)
    await user.click(submitButton)
    expect(mockSetItems).toHaveBeenCalledWith([testItems[0], testItems[1]]) // アイテムが追加されることを確認
    expect(mockSetItems).toHaveBeenCalledTimes(1) // アイテムが追加されることを確認
    expect(mockItems).toEqual([testItems[0], testItems[1]]) // アイテムが追加されることを確認
    expect(mockSetModalIsOpen).toHaveBeenCalledWith(false) // モーダルが閉じられることを確認
  })

  test("フォーム送信中はローディングが表示される", async () => {
    ;(useParams as jest.Mock).mockReturnValue({ categoryId: testItems[0].categoryId })
    
    // APIレスポンスを遅延させる
    ;(global.fetch as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => { // 処理の遅延を再現するためにsetTimeoutを使う
          resolve({
            ok: true,
            json: async () => ({
              item: testItems[0]
            })
          })
        }, 100)
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
    await user.type(wordInput, testItems[0].word)
    await user.type(meaningInput, testItems[0].meaning)
    await user.click(submitButton)

    // ローディング表示が表示されることを確認
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
    expect(submitButton).not.toBeInTheDocument()

    // APIレスポンス後にローディングが消えることを確認
    await screen.findByRole("button", {name: "保存"}) // findByRoleは要素が見つかるまで自動的に待つ。デフォルトでは1000ms待つ。第3引数に{ timeout: 2000 }を渡すと2000ms待つ。
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
  })
})