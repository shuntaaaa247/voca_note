"use client"
import useSWR from "swr"
import type { Item as ItemType } from "../../../../backend/generated/zod"
import { Item } from "@/components/note/item"
import { useCookies } from 'next-client-cookies';
import { CreateItemButton } from "./createItemButton";

const categoryId: string = "45f6c41d-c78b-4cbf-88f9-1dbe16bd50b7"

export const Note = () => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const url = "http://localhost:5000/categories/45f6c41d-c78b-4cbf-88f9-1dbe16bd50b7/items"

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

  const { data: items, error, isLoading } = useSWR(url, fetcher)

  return(
    <div className="basis-5/6 flex justify-start my-5 py-20 mr-3 rounded-3xl shadow-xl overflow-auto bg-slate-50">
      <div className="basis-full ">
        <h2 className="pb-3 ml-7 mr-2 text-4xl text-slate-700 font-medium border-b-2">IT用語</h2>
        <ul className="my-4 mx-2">
          {items?.map((item: ItemType) => (
            <Item id={item.id} word={item.word} meaning={item.meaning} categoryId={item.categoryId} createdAt={item.createdAt} updatedAt={item.updatedAt} key={item.id}/>  
          ))}
          <BlankList />
        </ul>
        <CreateItemButton />
      </div>
    </div>
  )
}

const BlankList = () => {
  return (
    <>
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
    </>        
  )
}