import Link from 'next/link';
import { cookies } from 'next/headers'
import { Suspense } from 'react';
import { Category } from "../../../../backend/generated/zod";
import { CreateCategoryButton } from './createCategoryButton';
import { redirect } from 'next/navigation';
import { LinkButton } from './LinkButton';
redirect

export const LeftBar = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  const userId = cookieStore.get("userId")?.value
  let categories: Category[] = []

  // const url: string = `${process.env.NEXT_PUBLIC_API_URL}/categories`
  const url: string = `http://backend:5000/categories`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "authorization": `Bearer ${token}`
    }
  })
  const resJson = await response.json()
  // const categories = resJson.categories
  if (response.ok) {
    categories = resJson.categories
  } else if (response.status === 401) {
    redirect("/login")
  } else {
    return (
      <div>500 Server Error</div>
    )
  }

  return(
    <div className="flex flex-col h-screen basis-1/6 sticky top-0">
      <h1 className="text-3xl m-2 mb-10 font-thin">VOCA NOTE</h1>
      <CreateCategoryButton />
      <Suspense fallback={<div>読み込み中...</div>}>
        {categories.map((category: Category) => {
          return (
            // <Link href={`/category/${category.id}`} className="w-[85%] py-1 px-2 my-2 mx-4 text-xl text-left text-slate-700 rounded-md hover:bg-slate-300">{category.categoryName}</Link>    
            <LinkButton id={category.id} categoryName={category.categoryName} userId={category.userId} createdAt={category.createdAt} updatedAt={category.updatedAt}/>
          )
        })}
      </Suspense>
      <p>{userId}</p>
    </div>
  )
}