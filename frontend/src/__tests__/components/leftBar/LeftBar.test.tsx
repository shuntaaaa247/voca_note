import { render, screen } from "@testing-library/react"
import { LeftBar } from "@/components/leftBar/LeftBar"

// Next.jsのcookiesをモック
jest.mock('next/headers', () => ({
  cookies: () => ({
    get: (name: string) => {
      if (name === 'token') return { value: 'test-token' }
      if (name === 'userId') return { value: 'test-user-id' }
      return null
    }
  })
}))

// fetchをモック
global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ 
      categories: [
        { id: '1', categoryName: 'TestCategory', userId: 'test-user-id', createdAt: new Date(), updatedAt: new Date() }
      ] 
    })
  })
) as jest.Mock

// redirectをモック
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useRouter: jest.fn()
}))

// // CreateCategoryButtonとLinkButtonをモック
// jest.mock('@/components/leftBar/CreateCategoryButton', () => ({
//   CreateCategoryButton: () => <div data-testid="create-category-button">Create Category</div>
// }))

// jest.mock('@/components/leftBar/LinkButton', () => ({
//   LinkButton: ({ categoryName }: { categoryName: string }) => (
//     <div data-testid="link-button">{categoryName}</div>
//   )
// }))


describe("LeftBar_正常系", () => {
  test("LeftBarが正しく表示される", async () => {
    const leftBarComponent = await LeftBar()
    render(leftBarComponent)
    expect(screen.getByText("VOCA NOTE")).toBeInTheDocument()
  })
})
