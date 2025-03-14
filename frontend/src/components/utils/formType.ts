import { z } from "zod"

export const ItemFormSchema = z.object({
  word: z.string().min(1, { message: "\"言葉\"は必須です" }).max(300, { message: "300文字以内で入力してください" }),
  meaning: z.string().min(1, { message: "\"意味\"は必須です" }).max(300, { message: "300文字以内で入力してください" }),
})

export type ItemFormType = z.infer<typeof ItemFormSchema> 

export const CategoryFormSchema = z.object({
  categoryName: z.string().min(1, { message: "\"カテゴリー名\"は必須です" }).max(200, { message: "200文字以内で入力してください" }),
})

export type CategoryFormType = z.infer<typeof CategoryFormSchema> 