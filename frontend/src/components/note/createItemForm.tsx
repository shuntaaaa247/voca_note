import { useContext, useRef, useState, useEffect } from "react";
import { useCookies } from 'next-client-cookies';
import { useParams } from 'next/navigation';
import { FormNoteLine } from "../utils/formNoteLine";
import { ItemsContext } from "./testNote";

export const CreateItemForm = ({
  setModalIsOpen,
}:{
  setModalIsOpen: (isOpen: boolean) => void
}) => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const wordRef = useRef<HTMLInputElement>(null);
  const meaningRef = useRef<HTMLInputElement>(null);
  const [wordErrorMessage, setWordErrorMessage] = useState<string>("") ;
  const [meaningErrorMessage, setMeaningErrorMessage] = useState<string>("")
  const { items, setItems } = useContext(ItemsContext);
  const params = useParams()
  const categoryId = params.categoryId;

  useEffect(() => {
    wordRef.current?.focus();
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/items`, {
      method: "POST",
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
      setItems([...items ?? [], resJson.item])
      setModalIsOpen(false)
    } else if (resJson.message) {
      setWordErrorMessage("");
      setMeaningErrorMessage("")
      if (resJson.message.includes("word")) {
        setWordErrorMessage(resJson.message)
      } else if (resJson.message.includes("meaning")) {
        setMeaningErrorMessage(resJson.message)
      } else {
        setMeaningErrorMessage(resJson.message)
        console.log("エラーが発生しました\n" + resJson.message)
        alert("エラーが発生しました\n" + resJson.message)
      }
    }
  }

  return(
    <form onSubmit={handleSubmit} className="flex flex-col w-full h-full bg-slate-50 rounded-xl shadow-md">
      <h1 className="text-center text-3xl text-blue-500 mt-6 mb-4">New Vocabulary</h1>
      <FormNoteLine>
        <></>
      </FormNoteLine>
      <FormNoteLine>
        <label className="pl-2 pt-3">・言葉</label>
      </FormNoteLine>
      <FormNoteLine>
        <input ref={wordRef} type="text" placeholder="Apple" className="bg-slate-50 pl-2 pt-2 ml-4 w-full focus:outline-none"/>
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
        <input ref={meaningRef} type="text" placeholder="リンゴ" className="bg-slate-50 pl-2 pt-2 ml-4 w-full focus:outline-none"/>
      </FormNoteLine>
      { meaningErrorMessage 
      ? <FormNoteLine>
          <p className="pl-2 ml-4 pt-3 text-red-500">{meaningErrorMessage}</p>
        </FormNoteLine>
      : <></>
      }
      <FormNoteLine>
        <button type="submit" className="border-blue-500 border-2 text-blue-500 text-lg px-3 my-0.5 mx-auto hover:bg-blue-500 hover:text-white">保存</button>
      </FormNoteLine>
      <FormNoteLine isDeepest={true}>
        <></>
      </FormNoteLine>
      <div className="h-14">
      </div>
    </form>
  )
}