import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { useParams } from "next/navigation"
import { CreateItemButton } from "@/components/note/CreateItemButton"

const user = userEvent.setup()

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: jest.fn(),
}));

describe("components/CreateItemButton.tsx", () => {
  test("アイテム作成ボタンが表示される", () => {
    render(<CreateItemButton />)
    expect(screen.getByTestId("CreateIcon")).toBeVisible()
  })
  test("アイテム作成ボタンをクリックするとアイテム作成モーダルが表示される", async () => {
    (useParams as jest.Mock).mockReturnValue({ categoryId: '1' });
    render(<CreateItemButton />)
    const createItemButton = screen.getByTestId("CreateIcon")
    await user.click(createItemButton)
    expect(screen.getByTestId("modalWindow")).toBeVisible()
    expect(screen.getByTestId("CreateItemForm")).toBeVisible()
  })
})