"use client"
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, createContext } from "react"
import useSWR from 'swr';
import { useCookies } from 'next-client-cookies';
import CircularProgress from '@mui/material/CircularProgress';
import { Item as ItemType } from "../../../../backend/generated/zod"
import { Item } from "./Item"
import { CreateItemButton } from "./CreateItemButton"

export const ItemsContext = createContext({} as {
  items: ItemType[] | undefined,
  setItems: React.Dispatch<React.SetStateAction<ItemType[] | undefined>>
})

export const Note = () => {
  const [items, setItems] = useState<ItemType[]>()
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fetchItemsError, setFetchItemsError] = useState<boolean>(false)
  const loadingRef = useRef<HTMLDivElement>(null)
  const cookies = useCookies()
  const token = cookies.get("token")
  const params = useParams()
  const categoryId = params.categoryId;
  const router = useRouter()
  const currentCategoryFetcher = (url: string) => fetch(url, {
    method: "GET",
    headers: {
      "authorization": `Bearer ${token}`
    }
  }).then(res => res.json())

  const { data: categoryData, error: fetchCategoryError, isLoading: _isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`, currentCategoryFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  if (fetchCategoryError) {
    // alert("エラーが発生しました:\n" + categoryError);

    if (fetchCategoryError.status === 401) {
      router.push("/login")
      return;
    }

    alert("エラーが発生しました\nfetchCategoryError: " + fetchCategoryError);
    console.log("エラーが発生しました\n", fetchCategoryError);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => { // コールバック関数([entry]) => {...}の引数[entry]は、IntersectionObserver.observe()で渡される引数を配列に格納したもの。すなわち[entry]なので、entryは配列の最初の要素。
      if (entry.isIntersecting && hasMore) { // entryはIntersectionObserver.observe()で渡される最初の引数。（observe()は何回でも呼べて、監視対象を複数指定できるが、entryは最初に指定した監視対象ということ）
        setIsLoading(true)
        let url: string
        if (!items) {
          url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/items?limit=10`
        } else {
          url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/items?cursor=${items.at(-1)?.createdAt}&limit=10`
        }
        try {
          const res = await fetch(url, { // 本当はuseEffect内でのfetchはよくない
            method: "GET",
            headers: {
            "authorization": `Bearer ${token}`
            }
          });

          if (res.status === 401) {
            // alert("トークンが無効です。\n" + res.statusText);
            router.push("/login")
            return;
          } 
          
          if (!res.ok) {
            throw new Error("res.statusText: " + res.statusText + "\nres.status: " + res.status);
          }
          const resJson = await res.json();
          const newItems: ItemType[] = resJson.items
          console.log("newItems => ", newItems)
          if (newItems.length > 0) {
            setItems([...items ?? [] , ...newItems ?? []])
            console.log("setItemsを実行しました")
          } else {
            setHasMore(false)
            console.log("setHasMore(false)を実行しました")
          }
          // setIsLoading(false)
        } catch (error) {
          alert("エラーが発生しました\n");
          console.log("エラーが発生しました\n", error);
          setFetchItemsError(true)
        }
        setIsLoading(false)
      }
    })

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => observer.disconnect()
  }, [items?.length ?? null, hasMore])

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      <div className="basis-5/6 flex justify-start my-5 py-20 mr-3 rounded-3xl shadow-xl overflow-auto bg-slate-50">
        <div className="basis-full ">
          { _isLoading
            ? <CircularProgress />
            : 
              fetchCategoryError
                ? <p className="pb-3 ml-7 mr-2 text-xl text-red-500 font-medium border-b-2">エラー：カテゴリーを取得できませんでした。</p>
                : <h2 className="pb-3 ml-7 mr-2 text-4xl text-slate-700 font-medium border-b-2">{ categoryData?.category?.categoryName ?? "エラー：カテゴリーを取得できませんでした。" }</h2>
          }
          { fetchItemsError
          ? <p className="ml-7 text-red-500 font-medium">エラー：アイテムを取得できませんでした。</p>
          : 
            <ul className="my-4 mx-2">
              {items?.map((item: ItemType) => {
                return (
                  <Item {...item} key={item.id}/>
                )
              })}
            </ul>
          }
        
          <CreateItemButton />
          <div ref={loadingRef} className='flex justify-center'>{ isLoading ? <CircularProgress /> : <></>}</div>
        </div>
      </div>
    </ItemsContext.Provider>
  )
}