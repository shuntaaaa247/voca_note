"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation";
import { useCookies } from 'next-client-cookies';
import { ModalWindow } from "../utils/modalWindow";
import { Item } from "../../../../backend/generated/zod";

export const CreateCategoryButton = () => {
  const router = useRouter()
  const cookies = useCookies();
  const token = cookies.get("token");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [wordErrorMessage, setWordErrorMessage] = useState<string>("");
  const categoryNameRef = useRef<HTMLInputElement>(null)
  const url: string = `${process.env.NEXT_PUBLIC_API_URL}/categories`

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        categoryName: categoryNameRef.current?.value
      })
    })
    if (res.ok) {
      const resJson = await res.json();
      const newItem: Item = resJson.item;
    } else {
      alert("カテゴリーを作成できませんでした")
    }
    setModalIsOpen(false);
    router.refresh()
  }
  return (
    <>
      { modalIsOpen 
        ?  
        <ModalWindow setModalIsOpen={setModalIsOpen}>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <label>カテゴリー名</label>
            <input ref={categoryNameRef}></input>
            <span>{wordErrorMessage ?? ""}</span>
            <button type='submit'>保存</button>
          </form>
        </ModalWindow>
        : 
        <></>
      }
      <button className="w-[85%] py-1 px-2 my-2 mx-4 text-xl text-left text-slate-700 rounded-md hover:bg-slate-300" onClick={() => setModalIsOpen(true)}>新規作成 +</button>
    </>
  )
}