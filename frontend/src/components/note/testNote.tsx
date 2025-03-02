"use client"
import { useParams } from 'next/navigation';
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

export const TestNote = () => {
  const [items, setItems] = useState<ItemType[]>()
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const loadingRef = useRef<HTMLDivElement>(null)
  const cookies = useCookies()
  const token = cookies.get("token")
  const params = useParams()
  const categoryId = params.categoryId;

  const currentCategoryFetcher = (url: string) => fetch(url, {
      method: "GET",
      headers: {
      "authorization": `Bearer ${token}`
      }
    }
  ).then(res => res.json())

  const { data: categoryData, error, isLoading: _isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`, currentCategoryFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  useEffect(() => {
    // console.log("===========\nuseEffect")
    const observer = new IntersectionObserver(async ([entry]) => { // コールバック関数([entry]) => {...}の引数[entry]は、IntersectionObserver.observe()で渡される引数を配列に格納したもの。すなわち[entry]なので、entryは配列の最初の要素。
      if (entry.isIntersecting && hasMore) { // entryはIntersectionObserver.observe()で渡される最初の引数。（observe()は何回でも呼べて、監視対象を複数指定できるが、entryは最初に指定した監視対象ということ）
        setIsLoading(true)
        let url: string
        if (!items) {
          url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/items?limit=10`
        } else {
          url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/items?cursor=${items.at(-1)?.createdAt}&limit=10`
        }
        const res = await fetch(url, { // 本当はuseEffect内でのfetchはよくない
          method: "GET",
          headers: {
            "authorization": `Bearer ${token}`
          }
        });
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
        setIsLoading(false)
      }
    })

    if (loadingRef.current) {
      // console.log("loadingRef.currentがあるのでobserveします")
      // console.log("loadingRef.current => ", loadingRef.current)
      observer.observe(loadingRef.current)
    }

    // console.log("===========")
    return () => observer.disconnect()
  }, [items?.length ?? null, hasMore])

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      <div className="basis-5/6 flex justify-start my-5 py-20 mr-3 rounded-3xl shadow-xl overflow-auto bg-slate-50">
        <div className="basis-full ">
          { _isLoading
          ? <CircularProgress />
          :  <h2 className="pb-3 ml-7 mr-2 text-4xl text-slate-700 font-medium border-b-2">{ categoryData?.category.categoryName }</h2>
          }
          <ul className="my-4 mx-2">
            {items?.map((item: ItemType) => {
              return (
                <Item {...item} key={item.id}/>
              )
            })}
          </ul>
          <CreateItemButton />
          <div ref={loadingRef} className='flex justify-center'>{ isLoading ? <CircularProgress /> : <></>}</div>
        </div>
      </div>
    </ItemsContext.Provider>
  )
}