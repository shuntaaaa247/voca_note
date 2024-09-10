import type { Item as ItemType } from "../../../../backend/generated/zod"
import { Item } from "@/components/note/item"

export const Note = () => {
  const items: ItemType[] = [
    {
      id: "1",
      word: "BaaS",
      meaning: "バックエンド as a サービス",
      categoryId: "1"
    },
    {
      id: "2",
      word: "SaaS",
      meaning: "ソフトウェア as a サービス",
      categoryId: "1"
    },
    {
      id: "3",
      word: "PaaS",
      meaning: "プラットフォーム as a サービス",
      categoryId: "1"
    }
  ]
  return(
    <div className="basis-5/6 flex justify-start my-5 py-20 mr-3 rounded-3xl shadow-xl overflow-auto bg-slate-50">
      <div className="basis-full ">
        <h2 className="pb-3 ml-7 mr-2 text-4xl text-slate-700 font-medium border-b-2">IT用語</h2>
        <ul className="my-4 mx-2">
          {items.map((item, index) => (
            <Item id={item.id} word={item.word} meaning={item.meaning} categoryId={item.categoryId}/>  
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