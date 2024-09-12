import type { Item as ItemProps } from "../../../../backend/generated/zod"

export const Item = ( { id, word, meaning, categoryId, createdAt, updatedAt } : ItemProps) => {
  return(
    <li key={id} className="pl-2">
      <div className="flex justify-start">
        <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
        <div className="w-full border-b">
          <p className="text-xl my-1 text-slate-700 font-medium">{word}</p>
          <p className="text-xl my-1 text-slate-700 font-medium">{meaning}</p>
        </div>
      </div>
    </li>
  )
}