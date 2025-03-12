import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";
import { ItemSchema, Item, Category } from "../../generated/zod";

const prisma = new PrismaClient();
export const itemRouter = Router();

// categoryルータからここに処理が渡される。
itemRouter.post("/:categoryId/items", async (req: Request, res: Response, next: NextFunction) => {
  console.log("req.body " + JSON.stringify(req.body))
  try {
    const category: Category | null = await prisma.category.findUnique({
      where: {
        id: req.params.categoryId
      }
    })
    if (!category) {
      return res.status(404).json({ message: "カテゴリーが見つかりません。"})
    }
    if (req.decoded.id !== category?.userId) {
      return res.status(403).json({ message: "権限がありません。" })
    }
    const itemData = ItemSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse({ //zod-prisma-typesで作成したバリデーションを使用するには、zodのparseメソッドを使用する
      word: req.body.word,
      meaning: req.body.meaning,
      categoryId: category.id // generated/zod/index.tsのItemSchemaにて、categoryIdはstring型で定義されているため、category.idはstring型である必要がある。つまり必須項目であるため、parseメソッドの引数には必ずcategoryIdを指定する必要がある
    }); 
    const item: Item = await prisma.item.create({
      data: itemData
    });
    
    return res.status(201).json({ item });
  } catch(e) {
    console.log(e)
    if (e instanceof z.ZodError) {
      return res.status(400).json({ message: `${e.issues[0].path}: ${e.issues[0].message}`})
    }
    return res.json(500).json({ message: "予期せぬエラーが発生しました.。" })
  }
});

// itemRouter.get("/:categoryId/items", async (req: Request, res: Response, next: NextFunction) => {
itemRouter.get("/:categoryId/items", async (req: Request, res: Response, next: NextFunction) => { // /:categoryId/items?cursor=[最後に取得したアイテムのcreatedAt]&limit=[取得したい件数]&order=latest
  try {
    const category: Category | null = await prisma.category.findUnique({
      where: {
        id: req.params.categoryId
      }
    })
    
    if (!category) {
      return res.status(404).json({ message: "カテゴリーが見つかりませんでした。" })
    }

    if (category.userId !== req.decoded.id) {
      return res.status(403).json({ message: "権限がありません。" })
    }

    let items: Item[];
    if (req.query.cursor && req.query.limit) {
      items = await prisma.item.findMany({
        where: {
          categoryId: req.params.categoryId,
          createdAt: {
            gt: String(req.query.cursor)
          }
        },
        take: Number(req.query.limit),
        orderBy: { createdAt: req.query.order !== "latest" ? "asc" : "desc" }
      })
    } else if (req.query.limit) {
      items = await prisma.item.findMany({
        where: {
          categoryId: req.params.categoryId
        },
        take: Number(req.query.limit),
        orderBy: { createdAt: req.query.order !== "latest" ? "asc" : "desc" }
      })
    } else {
      items = await prisma.item.findMany({
        where: {
          categoryId: req.params.categoryId,
        },
        orderBy: { createdAt: "asc" }
      })
    }

    return res.status(200).json({ items });
  } catch(e) {
    console.log(e);
    return res.status(500).json({ message: "予期せぬエラーが発生しました。" })
  }
})

itemRouter.patch("/:categoryId/items/:itemId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category: Category | null = await prisma.category.findUnique({
      where: {
        id: req.params.categoryId
      }
    })
    if (!category) {
      return res.status(404).json({ message: "カテゴリーが見つかりませんでした。"})
    }
    if (category.userId !== req.decoded.id) {
      return res.status(403).json({ message: "権限がありません。" })
    }

    const itemData = ItemSchema.omit({ createdAt: true, updatedAt: true }).parse({//zod-prisma-typesで作成したバリデーションを使用するには、zodのparseメソッドを使用する
      id: req.params.itemId,// generated/zod/index.tsのItemSchemaにて、idはstring型で定義されているため、req.params.itemIdはstring型である必要がある。つまり必須項目であるため、parseメソッドの引数には必ずidを指定する必要がある
      word: req.body.word,
      meaning: req.body.meaning,
      categoryId: category.id// generated/zod/index.tsのItemSchemaにて、categoryIdはstring型で定義されているため、category.idはstring型である必要がある。つまり必須項目であるため、parseメソッドの引数には必ずcategoryIdを指定する必要がある
    });
    
    const item: Item = await prisma.item.update({
      where: {
        id: itemData.id,
        categoryId: itemData.categoryId
      },
      data: {
        word: itemData.word,
        meaning: itemData.meaning,
      }
    })
    return res.status(200).json({ item })
  } catch(e) {
    console.log(e)
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return res.status(404).json({ message: "アイテムが見つかりませんでした。" })
    }
    if (e instanceof z.ZodError) {
      return res.status(400).json({ message: `${e.issues[0].path}: ${e.issues[0].message}`})
    }
    return res.status(500).json({ message: "予期せぬエラーが発生しました。"})
  }
})

itemRouter.delete(`/:categoryId/items/:itemId`, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category: Category | null = await prisma.category.findUnique({
      where: {
        id: req.params.categoryId
      }
    })
    if (!category) {
      return res.status(404).json({ message: "カテゴリーが見つかりませんでした。" })
    }

    const item: Item | null = await prisma.item.findUnique({
      where: {
        id: req.params.itemId,
        categoryId: req.params.categoryId
      }
    })
    if (!item) {
      return res.status(404).json({ message: "アイテムが見つかりませんでした。" })
    }

    if (category.userId !== req.decoded.id) {
      return res.status(403).json({ message: "権限がありません。" })
    }

    await prisma.item.delete({
      where: {
        id: req.params.itemId
      }
    })

    return res.status(204).json()
  } catch(e) {
    console.log(e)
    return res.status(500).json("予期せぬエラーが発生しました。")
  }
})