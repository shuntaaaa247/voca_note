import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormSchema, CategoryFormType } from "../utils/formType";

export const CreateCategoryForm = ({
  setModalIsOpen,
  // setCategoryNameErrorMessage,
}: {
  setModalIsOpen: (isOpen: boolean) => void,
  // setCategoryNameErrorMessage: (message: string) => void,
}) => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const router = useRouter();
  const url: string = `${process.env.NEXT_PUBLIC_API_URL}/categories`
  const { register, handleSubmit, formState: { errors }, setFocus } = useForm<CategoryFormType>({ //zodで定義したスキーマから取り出した型を設定する
    resolver: zodResolver(CategoryFormSchema) //zodで定義したスキーマでバリデーションするため
  });

  console.log(errors)

  const onSubmit: SubmitHandler<CategoryFormType> = async (inputData) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        categoryName: inputData.categoryName
      })
    })
    const resJson = await res.json();
    if (res.ok) {
      setModalIsOpen(false);
    } else {
      console.log(resJson)
      alert(resJson.message)
      setFocus("categoryName")
    }
    router.refresh()
  }

  useEffect(() => {
    setFocus("categoryName")
  }, [setFocus])

  return(
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <label>カテゴリー名</label>
      <input {...register("categoryName")} maxLength={200} minLength={1}></input>
      <span className="text-red-500">{errors.categoryName?.message ?? ""}</span>
      <button type='submit'>保存</button>
    </form>
  )
}