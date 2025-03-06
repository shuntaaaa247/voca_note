import { render, screen } from "@testing-library/react"
import { EditItemModalContent } from "@/components/note/EditItemModalContent"
import { testItems } from "@/__tests__/__utils__/testData"
import { UI_DATA } from "@/constants/uidata"
import { Item } from "../../../../../backend/generated/zod"

// EditItemFormコンポーネントをモック
jest.mock("@/components/note/EditItemForm", () => ({
  EditItemForm: ({ 
    item, 
    setSelectionModalIsOpen, 
    setEditModalIsOpen 
  }: {
    item: Item,
    setSelectionModalIsOpen: (isOpen: boolean) => void,
    setEditModalIsOpen: (isOpen: boolean) => void
  }) => (
    <div data-testid="mock-edit-item-form">
      <span>編集フォーム</span>
      <span data-testid="item-word">{item.word}</span>
      <span data-testid="item-meaning">{item.meaning}</span>
    </div>
  )
}))

// ModalWindowコンポーネントをモック
jest.mock("@/components/utils/ModalWindow", () => ({
  ModalWindow: ({ 
    children, 
    setModalIsOpen, 
    screenClassName, 
    modalClassName 
  }: {
    children: React.ReactNode,
    setModalIsOpen: (isOpen: boolean) => void,
    screenClassName: string,
    modalClassName: string
  }) => (
    <div data-testid="mock-modal-window" className={modalClassName}>
      <button onClick={() => setModalIsOpen(false)}>閉じる</button>
      {children}
    </div>
  )
}))

describe("EditItemModalContent", () => {
  const mockSetSelectionModalIsOpen = jest.fn()
  const mockSetEditModalIsOpen = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  test("正しくレンダリングされる", () => {
    render(
      <EditItemModalContent 
        item={testItems[0]} 
        setSelectionModalIsOpen={mockSetSelectionModalIsOpen} 
        setEditModalIsOpen={mockSetEditModalIsOpen} 
      />
    )
    
    // ModalWindowが正しいクラス名で呼び出されていることを確認
    const modalWindow = screen.getByTestId("mock-modal-window")
    expect(modalWindow).toHaveClass(UI_DATA.editItemModal.modalClassName)
    
    // EditItemFormが正しく呼び出されていることを確認
    const editItemForm = screen.getByTestId("mock-edit-item-form")
    expect(editItemForm).toBeInTheDocument()
    
    // 正しいアイテムデータが渡されていることを確認
    expect(screen.getByTestId("item-word")).toHaveTextContent(testItems[0].word)
    expect(screen.getByTestId("item-meaning")).toHaveTextContent(testItems[0].meaning)
  })
  
  test("EditItemFormに正しいpropsが渡されている", () => {
    render(
      <EditItemModalContent 
        item={testItems[0]} 
        setSelectionModalIsOpen={mockSetSelectionModalIsOpen} 
        setEditModalIsOpen={mockSetEditModalIsOpen} 
      />
    )
    
    // EditItemFormに正しいアイテムデータが渡されていることを確認
    expect(screen.getByTestId("item-word")).toHaveTextContent(testItems[0].word)
    expect(screen.getByTestId("item-meaning")).toHaveTextContent(testItems[0].meaning)
  })
})
