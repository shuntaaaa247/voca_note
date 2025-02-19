import { useEffect, useContext } from "react"
import { useCookies } from 'next-client-cookies';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemsContext } from "./TestNote";
import { FormNoteLine } from "../utils/FormNoteLine"
import { ItemFormSchema, ItemFormType } from "../utils/formType";
import type { Item } from "../../../../backend/generated/zod"

export const EditItemForm = ({
  item,
  setSelectionModalIsOpen,
  setEditModalIsOpen,
}:{
  item: Item,
  setSelectionModalIsOpen: (isOpen: boolean) => void,
  setEditModalIsOpen: (isOpen: boolean) => void
}) => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const { items, setItems } = useContext(ItemsContext);

  const { register, handleSubmit, formState: { errors }, setFocus } = useForm<ItemFormType>({ //zodで定義したスキーマから取り出した型を設定する
    resolver: zodResolver(ItemFormSchema) //zodで定義したスキーマでバリデーションするため
  });

  console.log("errors", errors);

  const onSubmit: SubmitHandler<ItemFormType> = async (inputData) => {
    console.log(inputData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${item.categoryId}/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        word: inputData.word, 
        meaning: inputData.meaning
      }),
    })

    const resJson = await res.json();
    if (resJson.item) {
      // 編集したアイテムをitemsの中で更新
      const updatedItems = items?.map(item => item.id === item.id ? resJson.item : item);
      setItems(updatedItems);

      setEditModalIsOpen(false)
      setSelectionModalIsOpen(false)

    } else if (resJson.message) {
      console.log("エラーが発生しました\n" + resJson.message)
      alert("エラーが発生しました\n" + resJson.message)
    }
  }

  useEffect(() => {
    setFocus("word");
  }, [])

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full h-full bg-slate-50 rounded-xl shadow-md">
      <h1 className="text-center text-3xl text-green-600 mt-6 mb-4">Edit Vocabulary</h1>
      <FormNoteLine>
        <></>
      </FormNoteLine>
      <FormNoteLine>
        <label className="pl-2 pt-3">・言葉</label>
      </FormNoteLine>
      <FormNoteLine>
        <input type="text" defaultValue={item.word} placeholder="Apple" className="bg-slate-50 pl-2 pt-2 ml-4 w-full focus:outline-none" {...register("word")} />
      </FormNoteLine>
      { errors.word?.message 
      ? <FormNoteLine>
          <p className="pl-2 ml-4 pt-3 text-red-500">{errors.word.message}</p>
        </FormNoteLine>
      : <></>
      }
      <FormNoteLine>
        <label className="pl-2 pt-3">・意味</label>
      </FormNoteLine>
      <FormNoteLine>
        <input type="text" defaultValue={item.meaning} placeholder="リンゴ" className="bg-slate-50 pl-2 pt-2 ml-4 w-full focus:outline-none" {...register("meaning")} />
      </FormNoteLine>
      { errors.meaning?.message 
      ? <FormNoteLine>
          <p className="pl-2 ml-4 pt-3 text-red-500">{errors.meaning.message}</p>
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