import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { Item } from "@/components/note/Item"
import { testItems } from "@/__test__/__utils__/testData"

const user = userEvent.setup()

describe("components/Item.tsx", () => {
  test("アイテムが正しく表示される", () => {
    render(<Item {...testItems[0]} key={testItems[0].id} />)
    expect(screen.getByText(testItems[0].word)).toBeVisible()
    expect(screen.getByText(testItems[0].meaning)).toBeVisible()
    expect(screen.getByTestId("hole")).toBeVisible()
  })

  test("アイテムをホバーした時にMUIの<MoreHorizIcon />が表示される", async () => {
    render(<Item {...testItems[0]} key={testItems[0].id} />)
    const holeSpan = screen.getByTestId("hole")
    await user.hover(holeSpan) // spanタグをホバーする
    expect(screen.getByTestId("hoveringIcon")).toBeVisible()
  })

  test("MUIアイコンをクリックすると削除、編集選択モーダルが表示さ表示される", async () => {
    render(<Item {...testItems[0]} key={testItems[0].id} />)
    const holeSpan = screen.getByTestId("hole")
    await user.hover(holeSpan)
    const muiIcon = screen.getByTestId("hoveringIcon")
    await user.click(muiIcon)
    expect(screen.getByTestId("modalWindow")).toBeVisible()
    expect(screen.getByTestId("SelectionModalContent")).toBeVisible()
  })
})
