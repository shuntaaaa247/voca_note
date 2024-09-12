"use client"
import useSWR, { Fetcher } from "swr"
import type { Item as ItemType } from "../../../../backend/generated/zod"
import { Item } from "@/components/note/item"

const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0OGU5ZWY1LWQxOGItNDM2Mi05YmFlLTMyMTUyOWE4NDk0NSIsImVtYWlsIjoidGVzdGplc3RAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNzI2MTQzODQyLCJleHAiOjE3MjYxNDc0NDJ9.-g2kVxlzGob5KTJ5Kn-qFzkwdWAYtn-H8nzuUpW2qqc"
const categoryId: string = "45f6c41d-c78b-4cbf-88f9-1dbe16bd50b7"

// const fetcher = async (url: string): Promise<{ items: ItemType[] } | null> => {
//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "authorization": `Bearer ${token}`
//     }
//   })
//   return await (res.json() as Promise<{ items: ItemType[]}  | null>)
// }

const fetcher = async (url: string): Promise<ItemType[] | null> => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "authorization": `Bearer ${token}`
    }
  })
  const resJson = await res.json();
  const items: ItemType[] | null = resJson.items
  return items;
}

export const Note = () => {
  // const url = "http://localhost:5000/categories/45f6c41d-c78b-4cbf-88f9-1dbe16bd50b7/items?cursor=2024-09-10T11:14:54.907Z&limit=4&order=latest"
  const url = "http://localhost:5000/categories/45f6c41d-c78b-4cbf-88f9-1dbe16bd50b7/items?limit=4"
  const { data: items, error, isLoading } = useSWR(url, fetcher)

  return(
    <div className="basis-5/6 flex justify-start my-5 py-20 mr-3 rounded-3xl shadow-xl overflow-auto bg-slate-50">
      <div className="basis-full ">
        <h2 className="pb-3 ml-7 mr-2 text-4xl text-slate-700 font-medium border-b-2">IT用語</h2>
        <ul className="my-4 mx-2">
          {/* { typeof data } */}
          {/* { JSON.stringify(data) } */}
          {items?.map((item: ItemType) => (
            <Item id={item.id} word={item.word} meaning={item.meaning} categoryId={item.categoryId} createdAt={item.createdAt} updatedAt={item.updatedAt} key={item.id}/>  
          ))}
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
          <li className="pl-2 h-[70px]">
            <div className="flex justify-start">
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
              <div className="w-full border-b">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}