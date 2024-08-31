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
    const categoryData = CategorySchema.omit({ id: true }).parse({categoryName: req.body.categoryName, userId: req.decoded.id});
    const category: Category = await prisma.category.create({
      data: categoryData
    });
    return res.status(200).json({ message: "作成完了", category })
  } catch(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: "そのカテゴリー名はすでに使用されています。"})
      }
    }
    if (e instanceof z.ZodError) {
      return res.status(400).json({ message: `${e.issues[0].path}: ${e.issues[0].message}`})
    }
    console.log(e)
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
    return res.status(200).json({ message: "取得完了", categories });
  } catch(e) {
    console.log(e);
    return res.json(500).json({ message: "予期せぬエラーが発生しました。" })
  }
})

categoryRouter.all("/items", (req: Request, res: Response, next: NextFunction) => {
  next("route");
})