import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EditItemForm } from "@/components/note/EditItemForm"
import { ItemsContext } from "@/components/note/TestNote"
import { testItems, longString } from "@/__tests__/__utils__/testData"
import { mockCookieStore } from "@/__tests__/__mocks__/cookies"

const user = userEvent.setup()

const mockSetSelectionModalIsOpen = jest.fn()
const mockSetEditModalIsOpen = jest.fn()
const mockSetItems = jest.fn()
global.fetch = jest.fn()


describe("EditItemForm", () => {
  beforeEach(() => {
    mockCookieStore.clear()
    mockCookieStore.set("token", "testToken")
    mockSetItems.mockClear()
    mockSetSelectionModalIsOpen.mockClear()
    mockSetEditModalIsOpen.mockClear()
  })

  test("正しくレンダリングされる", () => {
    render(
      <EditItemForm item={testItems[0]} setSelectionModalIsOpen={mockSetSelectionModalIsOpen} setEditModalIsOpen={mockSetEditModalIsOpen} />
    )

    expect(screen.getByLabelText("・言葉")).toBeInTheDocument() // ラベル「・言葉」が表示されている
    expect(screen.getByRole("textbox", { name: "・言葉" })).toHaveValue(testItems[0].word) // ラベルが「・言葉」のテキストボックスには、testItems[0].wordが表示されている
    expect(screen.getByLabelText("・意味")).toBeInTheDocument() // ラベル「・意味」が表示されている
    expect(screen.getByRole("textbox", { name: "・意味" })).toHaveValue(testItems[0].meaning) // ラベルが「・意味」のテキストボックスには、testItems[0].meaningが表示されている

    expect(screen.getByRole("textbox", { name: "・言葉" })).toHaveFocus() // ラベルが「・言葉」のテキストボックスにフォーカスが当たっている

    expect(screen.getByRole("button", { name: "編集を保存" })).toBeInTheDocument() // ボタン「編集を保存」が表示されている
  })

  test("フォームの入力値が変更される", async () => {

    render(
      <EditItemForm item={testItems[0]} setSelectionModalIsOpen={mockSetSelectionModalIsOpen} setEditModalIsOpen={mockSetEditModalIsOpen} />
    )

    const inputWord = screen.getByRole("textbox", { name: "・言葉" })
    const inputMeaning = screen.getByRole("textbox", { name: "・意味" })

    await user.clear(inputWord)
    await user.clear(inputMeaning)
    await user.type(inputWord, "Apple")
    await user.type(inputMeaning, "リンゴ")

    expect(inputWord).toHaveValue("Apple")
    expect(inputMeaning).toHaveValue("リンゴ")
  })

  test("アイテム編集用のエンドポイントに正しいリクエストが送信される", async () => {
    (global.fetch as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ok: true, json: async () => ({ item: testItems[0] }) })
        }, 100)
      })
    })

    render(
      <ItemsContext.Provider value={{ items: testItems, setItems: jest.fn() }}>
        <EditItemForm item={testItems[0]} setSelectionModalIsOpen={mockSetSelectionModalIsOpen} setEditModalIsOpen={mockSetEditModalIsOpen} />
      </ItemsContext.Provider>
    )
    
    await user.click(screen.getByRole("button", { name: "編集を保存" }))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${testItems[0].categoryId}/items/${testItems[0].id}`,
        {
          method: "PATCH",
          headers: {
            "authorization": `Bearer ${mockCookieStore.get("token")}`,
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            word: testItems[0].word,
            meaning: testItems[0].meaning,
          }),
        }
      )
    })
  })

  test("サブミット時にアイテム更新用のsetItemsが正しく呼び出される", async () => {
    // testItems[0]をアップデートしたものをupdatedItemとする
    const updatedItem = testItems[0]
    updatedItem.word = `${testItems[0].word}-updated`
    updatedItem.meaning = `${testItems[0].meaning}-updated`

    ;(global.fetch as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ok: true, json: async () => ({ item: updatedItem }) })
        }, 100)
      })
    })

    render(
      <ItemsContext.Provider value={{ items: testItems, setItems: mockSetItems }}>
        <EditItemForm item={testItems[0]} setSelectionModalIsOpen={mockSetSelectionModalIsOpen} setEditModalIsOpen={mockSetEditModalIsOpen} />
      </ItemsContext.Provider>
    )

    const inputWord = screen.getByRole("textbox", { name: "・言葉" })
    const inputMeaning = screen.getByRole("textbox", { name: "・意味" })

    await user.clear(inputWord)
    await user.clear(inputMeaning)

    await user.type(inputWord, `${testItems[0].word}-updated`)
    await user.type(inputMeaning, `${testItems[0].meaning}-updated`)

    await user.click(screen.getByRole("button", { name: "編集を保存" }))

    await waitFor(() => {
      // モーダルが閉じられているか
      expect(mockSetEditModalIsOpen).toHaveBeenCalledWith(false)
      expect(mockSetSelectionModalIsOpen).toHaveBeenCalledWith(false)
      // testItemsのindexが0のアイテムをupdatedItemに更新した配列がsetItemsに渡されているか
      expect(mockSetItems).toHaveBeenCalledWith(
        testItems.map(item => item.id === updatedItem.id ? updatedItem : item)
      )
    })
  })

  test("バリデーションエラーが表示される", async () => {
    render(
      <EditItemForm item={testItems[0]} setSelectionModalIsOpen={mockSetSelectionModalIsOpen} setEditModalIsOpen={mockSetEditModalIsOpen} />
    )

    const inputWord = screen.getByRole("textbox", { name: "・言葉" })
    const inputMeaning = screen.getByRole("textbox", { name: "・意味" })

    // 入力値が空の場合
    await user.clear(inputWord)
    await user.clear(inputMeaning)
    
    await user.click(screen.getByRole("button", { name: "編集を保存" }))

    await waitFor(() => {
      expect(screen.getByText('"言葉"は必須です')).toBeInTheDocument()
      expect(screen.getByText('"意味"は必須です')).toBeInTheDocument()
    })

    // 入力値が300文字を超える場合
    await user.clear(inputWord)
    await user.clear(inputMeaning)
    await user.type(inputWord, longString)
    await user.type(inputMeaning, longString)

    await user.click(screen.getByRole("button", { name: "編集を保存" }))
    
    await waitFor(() => {
      expect(screen.getAllByText("300文字以内で入力してください")).toHaveLength(2)
    })

  })
})