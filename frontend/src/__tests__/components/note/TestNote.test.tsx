import { render, screen, waitFor, act } from "@testing-library/react"
import { useParams, useRouter } from "next/navigation"
import useSWR from "swr"
import { Note } from "@/components/note/Note"
import { testItems, testCategories } from "@/__tests__/__utils__/testData"
import { mockCookieStore, mockUseCookies } from "@/__tests__/__mocks__/cookies"

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
  useSWR: jest.fn()
}))

// フェッチのモックを設定
const mockFetch = jest.fn().mockImplementationOnce(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        json: () => Promise.resolve({ items: testItems })
      })
    }, 100)
  })
}).mockImplementationOnce(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        ok: true, 
        json: () => Promise.resolve({ items: [] }) 
      })
    }, 100)
  })
})
global.fetch = mockFetch

// useEffect内のnew IntersectionObserver()に渡されたのコールバック関数が格納される変数
// この関数を実行すれば、useEffect内のIntersectionObserverのコールバック関数をテスト内で手動で実行できる
let intersectionCallback: IntersectionObserverCallback

const mockObserve = jest.fn()

// IntersectionObserverのモックを設定
// TestNote.tsxのuseEffect内のnew IntersectionObserver()が呼ばれるときに実行される
// callbackはTestNote.tsxのuseEffect内のnew IntersectionObserverに渡されるコールバック関数(具体的には、useEffect内の「async[entry]) => {...}」のとこ)
const mockIntersectionObserver = jest.fn((callback) => {
  // TestNote.tsxのuseEffect内のnew IntersectionObserverに渡されるコールバック関数をテストで手動で実行できるようにこのモック外の変数intersectionCallbackに格納
  intersectionCallback = callback 
  // IntersectionObserverのインスタンスプロパティ
  return { 
    root: null,
    rootMargin: '0px',
    thresholds: [0],
    observe: mockObserve,
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: () => []
  }
})
// TestNote.tsxのuseEffect内のnew IntersectionObserver()をモックしているから、本当のnew IntersectionObserver()、IntersectionObserver.observe()は実行されない（useEffect内の実際のデータフェッチなどは実行されない）。
global.IntersectionObserver = mockIntersectionObserver 

describe("TestNote", () => {
  beforeEach(() => {
    mockUseCookies.set.mockClear()
    mockUseCookies.get.mockClear()
    mockCookieStore.clear()
    mockCookieStore.set("token", "testToken")
    mockIntersectionObserver.mockClear()
    mockObserve.mockClear()
    mockFetch.mockClear()
  })
  test("カテゴリー名読み込み中に読み込み中の表示が出る", async () => {
    ;(useParams as jest.Mock).mockReturnValue({ categoryId: testItems[0].categoryId })
    ;(useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true // カテゴリー名読み込み中
    })
    
    render(<Note />)

    expect(screen.getByRole("progressbar")).toBeVisible()
  })

  test("カテゴリー名読み込み後にカテゴリー名が表示される", async () => {
    ;(useParams as jest.Mock).mockReturnValue({ categoryId: testItems[0].categoryId })
    ;(useSWR as jest.Mock).mockReturnValue({
      data: { category: testCategories[0] },
      error: null,
      isLoading: false // カテゴリー名読み込み後
    })

    render(<Note />)

    expect(await screen.findByRole("heading", { 
      name: testCategories[0].categoryName, 
      level: 2 
    })).toBeVisible()

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
  })

  test("IntersectionObserverのコールバックが実行されてアイテムが表示される", async () => {
    // モックの設定
    ;(useParams as jest.Mock).mockReturnValue({ categoryId: testItems[0].categoryId })
    ;(useSWR as jest.Mock).mockReturnValue({
      data: { category: testCategories[0] },
      error: null,
      isLoading: false
    })
  
    // TestNote.tsxがレンダリングされuseEffectが実行され、モックしたIntersectionObserverが生成される。そして、new IntersectionObserver()に渡されたコールバック関数がモック外の変数intersectionCallbackに格納される
    render(<Note />) // ① useEffect実行 → mockObserve(1回目)

    // useEffectが実行され、IntersectionObserver()とIntersectionObserver.observe()が実行されたことを確認
    expect(mockIntersectionObserver).toHaveBeenCalled()
    expect(mockObserve).toHaveBeenCalled()

    // IntersectionObserverのコールバックを実行（監視対象が画面に入ったときの処理を手動で実行している）
    await act(async () => {
      // ここで、TestNote.tsxのuseEffect内のnew IntersectionObserver()に渡されるコールバック関数を実行する。
      // すなわち、監視対象の要素が画面に入ったときの処理を手動で実行する。 
      // intersectionCallbackはTestNote.tsx内の実際のコールバック関数であるから、実際にTestNote.tsxのuseStateで状態を更新でき、状態変更のテストが行える。（IntersectionObserver()全体をモックしてしまうと、useStateで状態を更新できないので、テストができない）
      intersectionCallback([ // ② フェッチ開始
        { isIntersecting: true } as IntersectionObserverEntry
      ], {} as IntersectionObserver) // 実際はIntersectionObserver.observe()に渡されるコールバック関数の引数は、配列entries(このプロジェクトでは[entry])（第一引数）と、IntersectionObserver（第二引数）であるらしい。今回は第二引数は使わないのでダミーを渡す
      // ③ setItems実行
    }) // ④ actは完了

    // フェッチが正しいURLで呼ばれたことを確認
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(`/categories/${testItems[0].categoryId}/items`), // fetchの第一引数のurlが正しいか確認
      expect.objectContaining({ // fetchの第二引数に渡されるオブジェクトが正しいか確認
        method: "GET",
        headers: {
          "authorization": `Bearer ${mockCookieStore.get("token")}`
        }
      })
    )

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockObserve).toHaveBeenCalledTimes(1)

    // fetchが完了するまでローディングが表示されることを確認
    expect(screen.getByRole("progressbar")).toBeVisible()
  
    // アイテムが表示されることを確認
    await waitFor(() => {
      // すべてのアイテム要素を取得
      const itemElements = screen.getAllByTestId(/^item-/);

      // 順序のテスト
      testItems.forEach((item, index) => {
        const itemElement = itemElements[index];
        expect(itemElement).toHaveTextContent(item.word);
        expect(itemElement).toHaveTextContent(item.meaning);
      });
    })

    // ⑤ この時点では、React の状態更新とそれに伴うuseEffectの「再」実行がまだ完了していない可能性がある

    // ⑤のため、状態更新と再レンダリングを待つ
    await waitFor(() => {
      expect(mockObserve).toHaveBeenCalledTimes(2) // 2回目のuseEffectが実行されIntersectionObserver.observe()が再び実行されたことを確認
      // 2回目のobserve()が確認できたら、再びfetchを含むコールバック関数を実行
      intersectionCallback([ 
        { isIntersecting: true } as IntersectionObserverEntry
      ], {} as IntersectionObserver)
    })

    // 2回目のfetchが完了したことを確認
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    // 2回目のフェッチ後、状態更新を確実に反映させる
    await act(async () => {
      // 単純に100ms待機して状態更新を確実に反映させる
      await new Promise(resolve => setTimeout(resolve, 100)); 
      // なぜこれが必要か：
      // テスト環境では、React の状態更新が即座に DOM に反映されないことがあります
      // 特に複雑な非同期処理（このケースではIntersectionObserverとfetch）を含む場合、状態更新のタイミングが予測しにくくなります
      // この待機処理がないと、状態が更新されても DOM がまだ更新されていない状態でテストが進行し、失敗する可能性があります
    });

    // ローディングが非表示になったことを確認
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  })
})