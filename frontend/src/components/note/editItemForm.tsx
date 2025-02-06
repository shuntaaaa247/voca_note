import { useRef, useState, useEffect, useContext } from "react"
import { useCookies } from 'next-client-cookies';
import { ItemsContext } from "./testNote";
import { FormNoteLine } from "../utils/formNoteLine"

export const EditItemForm = ({
  itemId,
  word,
  meaning,
  categoryId,
  setSelectionModalIsOpen,
  setEditModalIsOpen,
}:{
  itemId: string,
  word: string,
  meaning: string,
  categoryId: string,
  setSelectionModalIsOpen: (isOpen: boolean) => void,
  setEditModalIsOpen: (isOpen: boolean) => void
}) => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const wordRef = useRef<HTMLInputElement>(null);
  const meaningRef = useRef<HTMLInputElement>(null);
  const [wordErrorMessage, setWordErrorMessage] = useState<string>("") ;
  const [meaningErrorMessage, setMeaningErrorMessage] = useState<string>("");
  const { items, setItems } = useContext(ItemsContext);

  useEffect(() => {
    wordRef.current?.focus();
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        word: wordRef.current?.value,
        meaning: meaningRef.current?.value
      }),
    })

    const resJson = await res.json();
    if (resJson.item) {
      // 編集したアイテムをitemsの中で更新
      const updatedItems = items?.map(item => item.id === itemId ? resJson.item : item);
      setItems(updatedItems);

      setEditModalIsOpen(false)
      setSelectionModalIsOpen(false)

    } else if (resJson.message) {
      if (resJson.message.includes("word")) {
        setWordErrorMessage(resJson.message)
      } else if (resJson.message.includes("meaning")) {
        setMeaningErrorMessage(resJson.message)
      } else {
        setMeaningErrorMessage(resJson.message)
      }
    }
  }

  return(
    <form onSubmit={handleSubmit} className="flex flex-col w-full h-full bg-slate-50 rounded-xl shadow-md">
      <h1 className="text-center text-3xl text-green-600 mt-6 mb-4">Edit Vocabulary</h1>
      <FormNoteLine>
        <></>
      </FormNoteLine>
      <FormNoteLine>
        <label className="pl-2 pt-3">・言葉</label>
      </FormNoteLine>
      <FormNoteLine>
        <input ref={wordRef} type="text" defaultValue={word} placeholder="Apple" className="bg-slate-50 pl-2 pt-2 ml-4 w-full focus:outline-none"/>
      </FormNoteLine>
      { wordErrorMessage 
      ? <FormNoteLine>
          <p className="pl-2 ml-4 pt-3 text-red-500">{wordErrorMessage}</p>
        </FormNoteLine>
      : <></>
      }
      <FormNoteLine>
        <label className="pl-2 pt-3">・意味</label>
      </FormNoteLine>
      <FormNoteLine>
        <input ref={meaningRef} type="text" defaultValue={meaning} placeholder="リンゴ" className="bg-slate-50 pl-2 pt-2 ml-4 w-full focus:outline-none"/>
      </FormNoteLine>
      { meaningErrorMessage 
      ? <FormNoteLine>
          <p className="pl-2 ml-4 pt-3 text-red-500">{meaningErrorMessage}</p>
        </FormNoteLine>
      : <></>
      }
      <FormNoteLine>
        <button type="submit" className="border-green-600 border-2 text-green-600 text-lg px-3 my-0.5 mx-auto hover:bg-green-600 hover:text-white">編集を保存</button>
      </FormNoteLine>
      <FormNoteLine isDeepest={true}>
        <></>
      </FormNoteLine>
      <div className="h-14">
      </div>
    </form>
  )
}