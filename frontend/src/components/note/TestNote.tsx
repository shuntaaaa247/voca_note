"use client"
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState, createContext } from "react"
import useSWR from 'swr';
import { useCookies } from 'next-client-cookies';
import CircularProgress from '@mui/material/CircularProgress';
import { Item as ItemType } from "../../../../backend/generated/zod"
import { Item } from "./item"
import { CreateItemButton } from "./createItemButton"

export const ItemsContext = createContext({} as {
  items: ItemType[] | undefined,
  setItems: React.Dispatch<React.SetStateAction<ItemType[] | undefined>>
})

export const TestNote = () => {
  const [items, setItems] = useState<ItemType[]>()
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const loadingRef = useRef(null)
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
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && hasMore) {
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
      observer.observe(loadingRef.current)
    }

    return () => observer.disconnect()
  }, [items?.length ?? null, hasMore])

  return (
    <div className="basis-5/6 flex justify-start my-5 py-20 mr-3 rounded-3xl shadow-xl overflow-auto bg-slate-50">
      <div className="basis-full ">
        { _isLoading
        ? <CircularProgress />
        :  <h2 className="pb-3 ml-7 mr-2 text-4xl text-slate-700 font-medium border-b-2">{ categoryData?.category.categoryName }</h2>
        }
        <ul className="my-4 mx-2">
          {items?.map((item: ItemType) => {
            return (
              <ItemsContext.Provider value={{ items, setItems }} key={item.id} >
                <Item id={item.id} word={item.word} meaning={item.meaning} categoryId={item.categoryId} createdAt={item.createdAt} updatedAt={item.updatedAt} key={item.id}/>
              </ItemsContext.Provider>
            )
          })}
        </ul>
        <ItemsContext.Provider value={{ items, setItems }} >
          <CreateItemButton />
        </ItemsContext.Provider>
        <div ref={loadingRef} className='flex justify-center'>{ isLoading ? <CircularProgress /> : <></>}</div>
      </div>
    </div>
  )
}