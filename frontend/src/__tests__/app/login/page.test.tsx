import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { Login } from "../../../app/login/page"

// モックの設定
const mockRouter = { push: jest.fn() }
const cookieStore = new Map<string, string>()
const mockCookies = {
  set: jest.fn((key: string, value: string) => cookieStore.set(key, value)),
  get: jest.fn((key: string) => cookieStore.get(key))
}

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter
}))

jest.mock("next-client-cookies", () => ({
  useCookies: () => mockCookies
}))

global.fetch = jest.fn()

describe("login/page.tsx", () => {
  beforeEach(() => {
    // モックの初期化
    jest.clearAllMocks()
    global.fetch = jest.fn()
    cookieStore.clear() // テスト前にcookieストアをクリア
  })

  test("正しくフォームが表示される", () => {
    render(<Login />)
    expect(screen.getByRole(
      "heading", 
      {
        level: 1, 
        name: "Login"
      })).toBeVisible()
    // expect(screen.getByLabelText("メールアドレス")).toBeVisible()
    expect(screen.getByPlaceholderText("voca@note.com")).toBeVisible()
    // expect(screen.getByLabelText("パスワード")).toBeVisible()
    expect(screen.getByPlaceholderText("パスワード")).toBeVisible()
    expect(screen.getByRole("button", {name: "Login"})).toBeVisible()
    expect(screen.getByRole("link", {name: "アカウントをお持ちでない方"})).toBeVisible()
  })

  test("ログイン成功時にcookieが正しく設定され、取得できる", async () => {
    const mockUser = {
      id: "test-user-id",
      email: "test@example.com"
    }
    const mockToken = "test-token"

    // フェッチのモック
    ;(global.fetch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          user: mockUser,
          token: mockToken
        })
      })
    })

    render(<Login />)

    // フォームの入力
    fireEvent.change(screen.getByPlaceholderText("voca@note.com"), {
      target: { value: "test@example.com" }
    })
    fireEvent.change(screen.getByPlaceholderText("パスワード"), {
      target: { value: "password123" }
    })

    // フォームの送信
    fireEvent.submit(screen.getByRole("button", { name: "Login" }))

    // 非同期処理の完了を待つ
    await waitFor(() => {
      // cookieが正しく設定されたことを確認
      expect(mockCookies.set).toHaveBeenCalledWith("token", mockToken)
      expect(mockCookies.set).toHaveBeenCalledWith("userId", mockUser.id)
      
      // 設定したcookieが取得できることを確認
      expect(mockCookies.get("token")).toBe(mockToken)
      expect(mockCookies.get("userId")).toBe(mockUser.id)
      
      // ホームページにリダイレクトされることを確認
      expect(mockRouter.push).toHaveBeenCalledWith("/")
    })
  })
})