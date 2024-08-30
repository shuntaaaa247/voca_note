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

userRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  // return res.status(200).json(req.decoded);
  try {
    const _user: User | null = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (_user) {
      const { password, ...user } = _user;
      return res.status(200).json({ message: "取得成功", user })
    } else {
      return res.status(404).json({ message: "ユーザーが見つかりませんでした。"});
    }
  } catch(e: unknown) {
    return res.status(500).json("予期せぬエラーが発生しました。");
  }
  // try {
  //   const bearToken = req.headers["authorization"];
  //   const bearer = bearToken!.split(" ");
  //   const token = bearer![1];
  //   const decodedPayload: Payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as Payload;
  //   console.log(decodedPayload);

  //   const _user: User | null = await prisma.user.findUnique({
  //     where: {
  //       id: req.params.id
  //     }
  //   })

  //   if (_user) {
  //     const { password, ...user } = _user;
  //     return res.status(200).json({ message: "取得成功", user })
  //   } else {
  //     return res.status(404).json({ message: "ユーザーが見つかりませんでした。"});
  //   }
  // } catch(e: unknown) {
  //   console.log(e)
  //   if (e instanceof jwt.TokenExpiredError) {
  //     return res.status(401).json({ message: "トークンの有効期限が切れています。" });
  //   } else if (e instanceof jwt.JsonWebTokenError) {
  //     return res.status(401).json({ message: "トークンが無効です。"});
  //   }
  //   return res.send("予期せぬエラーが発生しました。");
  // }
})