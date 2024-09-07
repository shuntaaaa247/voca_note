import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Payload } from "../../types";
import { PrismaClient } from "@prisma/client";
import { User } from "../../generated/zod";
import { verifyToken } from "../middlewares/verifyToken";

export const userRouter = Router();
const prisma = new PrismaClient();

userRouter.use(verifyToken)

userRouter.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.decoded.id
      }
    })

    return res.status(204).send();
  } catch(e) {
    console.log(e);
    return res.status(500).json("予期せぬエラーが発生しました。")
  }
})

userRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _user: User | null = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (_user) {
      const { password, ...user } = _user;
      return res.status(200).json({ user })
    } else {
      return res.status(404).json({ message: "ユーザーが見つかりませんでした。"});
    }
  } catch(e: unknown) {
    return res.status(500).json("予期せぬエラーが発生しました。");
  }
})
