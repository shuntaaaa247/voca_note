import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";
import { verifyToken } from "../middlewares/verifyToken";
import { CategorySchema, Category } from "../../generated/zod";


export const categoryRouter: Router = Router();
const prisma = new PrismaClient();

categoryRouter.use(verifyToken);

categoryRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryData = CategorySchema.omit({ id: true, createdAt: true, updatedAt: true }).parse({categoryName: req.body.categoryName, userId: req.decoded.id});
    const category: Category = await prisma.category.create({
      data: categoryData
    });
    return res.status(201).json({ category })
  } catch(e) {
    // console.log(e)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: "そのカテゴリー名はすでに使用されています。"})
      }
    }
    if (e instanceof z.ZodError) {
      return res.status(400).json({ message: `${e.issues[0].path}: ${e.issues[0].message}`})
    }
    return res.status(500).json({ message: "予期せぬエラーが発生しました。" })
  }
})

categoryRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories: Category[] = await prisma.category.findMany({
      where: {
        userId: req.decoded.id
      }
    })
    return res.status(200).json({ categories });
  } catch(e) {
    console.log(e);
    return res.json(500).json({ message: "予期せぬエラーが発生しました。" })
  }
})

categoryRouter.delete("/:categoryId", async (req: Request, res: Response, next: NextFunction) => {
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
    await prisma.category.delete({
      where: {
        id: req.params.categoryId,
        userId: req.decoded.id
      }
    })
    return res.status(204).json()
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "予期せぬエラーが発生しました。" })
  }
})

categoryRouter.patch("/:categoryId", async (req: Request, res: Response) => {
  try {
    const category: Category = await prisma.category.update({
      where: {
        id: req.params.categoryId,
        userId: req.decoded.id
      },
      data: {
        categoryName: req.body.newCategoryName
      }
    })
    return res.status(200).json({ category })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return res.status(404).json({ message: "カテゴリーが見つかりませんでした。" })
    }
    return res.status(500).json({ message: "予期せぬエラーが発生しました。" })
  }
})

categoryRouter.all("/(:categoryId)/items", (req: Request, res: Response, next: NextFunction) => {
  next("route");
})