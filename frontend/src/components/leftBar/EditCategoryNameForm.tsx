import { useEffect } from "react";
import { useForm } from "react-hook-form";  
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from 'next-client-cookies';
import { CategoryFormSchema, CategoryFormType} from "../utils/formType";
import { useRouter } from "next/navigation";
import { FormNoteLine } from "../utils/FormNoteLine";

export const EditCategoryNameForm = ({ 
  categoryId,
  categoryName,
  setEditCategoryNameModalIsOpen,
  setSelectionModalIsOpen
 }: { 
  categoryId: string,
  categoryName: string,
  setEditCategoryNameModalIsOpen: (isOpen: boolean) => void,
  setSelectionModalIsOpen: (isOpen: boolean) => void
}) => {
  const router = useRouter();
  const cookies = useCookies();
  const token = cookies.get("token");
  const { register, handleSubmit, formState: { errors }, setFocus } = useForm<CategoryFormType>({
    resolver: zodResolver(CategoryFormSchema),
  });

  console.log(`errors: ${errors}`);

  const onSubmit = async (data: CategoryFormType) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ newCategoryName: data.categoryName }),
      });

      const resJson = await res.json();

      if (res.status === 401) {
        alert("認証のためログイン画面に移動します")
        router.push("/login")
        return;
      }

      if (!res.ok) {
        throw new Error("res.statusText: " + res.statusText + "\nres.status: " + res.status);
      }

      if (resJson.category) {
        setEditCategoryNameModalIsOpen(false);
        setSelectionModalIsOpen(false);
        router.refresh();
      } else {
        alert(`カテゴリーを取得できませんでした`);
        console.log("カテゴリーを取得できませんでした \nresJson.message", resJson.message);
      }
    } catch (error) {
      alert("エラーが発生しました");
      console.log("エラーが発生しました", error);
    }
  }
  
  useEffect(() => {
    setFocus("categoryName");
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center w-full bg-slate-50 rounded-xl shadow-md">
      <h1 className="text-center text-3xl text-green-600 mt-6 mb-4">Edit Category Name</h1>
      <FormNoteLine>
        <></>
      </FormNoteLine>
      <FormNoteLine>
        <label className="pl-2 pt-3">・カテゴリー名</label>
      </FormNoteLine>
      <FormNoteLine>
        <input type="text" {...register("categoryName")} defaultValue={categoryName} maxLength={200} minLength={1} className="w-full bg-slate-50 rounded-md pl-2 pt-2 ml-4 focus:outline-none"/>
      </FormNoteLine>
      {errors.categoryName?.message 
      ? <FormNoteLine>
          <p className="pl-2 ml-4 pt-3 text-red-500">{errors.categoryName?.message}</p>
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