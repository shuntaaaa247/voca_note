import { useContext, useEffect, useState } from "react";
import { useCookies } from 'next-client-cookies';
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form"
import CircularProgress from '@mui/material/CircularProgress';
import { FormNoteLine } from "../utils/FormNoteLine";
import { ItemsContext } from "./Note";
import { ItemFormSchema, ItemFormType } from "../utils/formType";

export const CreateItemForm = ({
  setModalIsOpen,
}:{
  setModalIsOpen: (isOpen: boolean) => void
}) => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const { items, setItems } = useContext(ItemsContext);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const categoryId = params.categoryId;
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setFocus } = useForm<ItemFormType>({ //zodで定義したスキーマから取り出した型を設定する
    resolver: zodResolver(ItemFormSchema) //zodで定義したスキーマでバリデーションするため
  });

  const onSubmit: SubmitHandler<ItemFormType> = async (inputData) => { //zodのバリデーションが通った時だけ実行される
    console.log(inputData);
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/items`, {
        method: "POST",
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          word: inputData.word,
          meaning: inputData.meaning
        }),
      })

      if (res.status === 401) {
        alert("認証のためログイン画面に移動します")
        router.push("/login")
        return;
      }

      if (!res.ok) {
        throw new Error("res.statusText: " + res.statusText + "\nres.status: " + res.status);
      }

      const resJson = await res.json();
      console.log(resJson)
      if (resJson.item) {
        setItems([...items ?? [], resJson.item])
        setModalIsOpen(false)
      } else {
        console.log("アイテムを取得できませんでした。\nresJson.message: " + resJson.message)
        alert("アイテムを取得できませんでした")
      }
    } catch (error) {
      alert("エラーが発生しました");
      console.log("エラーが発生しました\n", error);
    }
    setIsLoading(false);
  };

  console.log("errors", errors);

  useEffect(() => {
    setFocus("word"); // useFormのsetFocusを使って、フォーカスを当てる
  }, [])

  return(
    <form data-testid="CreateItemForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full h-full bg-slate-50 rounded-xl shadow-md">
      <h1 className="text-center text-3xl text-blue-500 mt-6 mb-4">New Vocabulary</h1>
      <FormNoteLine>
        <></>
      </FormNoteLine>
      <FormNoteLine>
        <label className="pl-2 pt-3">・言葉</label>
      </FormNoteLine>
      <FormNoteLine>
        <input type="text" placeholder="Apple" className="bg-slate-50 pl-2 pt-2 ml-4 w-full focus:outline-none" {...register("word")} />
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
        <input type="text" placeholder="リンゴ" className="bg-slate-50 pl-2 pt-2 ml-4 w-full focus:outline-none" {...register("meaning")} />
      </FormNoteLine>
        { errors.meaning?.message 
      ? <FormNoteLine>
          <p className="pl-2 ml-4 pt-3 text-red-500">{errors.meaning.message}</p>
        </FormNoteLine>
      : <></>
      }
      <FormNoteLine>
        {isLoading ? <CircularProgress className="mx-auto" /> : (
          <button type="submit" className="border-blue-500 border-2 text-blue-500 text-lg px-3 my-0.5 mx-auto hover:bg-blue-500 hover:text-white">保存</button>
        )}
      </FormNoteLine>
      <FormNoteLine isDeepest={true}>
        <></>
      </FormNoteLine>
      <div className="h-14">
      </div>
    </form>
  )
}