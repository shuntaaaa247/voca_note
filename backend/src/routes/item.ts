import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { ItemSchema, Item, Category } from "../../generated/zod";

const prisma = new PrismaClient();
export const itemRouter = Router();

// categoryルータからここに処理が渡される。
itemRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category: Category | null = await prisma.category.findUnique({
      where: {
        id: req.body.categoryId
      }
    })
    if (req.decoded.id !== category?.userId) {
      return res.status(403).json({ message: "権限がありません。" })
    }
    const itemData = ItemSchema.omit({ id: true }).parse({
      word: req.body.word,
      meaning: req.body.meaning,
      categoryId: category.id
    });
    const item: Item = await prisma.item.create({
      data: itemData
    });
    
    return res.status(200).json({ message: "作成完了", item });
  } catch(e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ message: `${e.issues[0].path}: ${e.issues[0].message}`})
    }
    return res.json(500).json({ message: "予期せぬエラーが発生しました.。" })
  }
})