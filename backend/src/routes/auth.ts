import { Router, Request, Response, NextFunction } from "express";
import { UserSchema, User } from "../../generated/zod";
import { PrismaClient, Prisma } from "@prisma/client";
import { Payload, LoggedinUser } from "../../types";
import { z } from "zod";
import { hash, compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"


const prisma = new PrismaClient();
export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = UserSchema.omit({"id": true, "createdAt":true, "updatedAt": true }).parse(req.body);
    userData.password = await hash(req.body.password, 10);
    // console.log(userData);
    const _user = await prisma.user.create({
      data: userData
    })
    const { password, ...user } = _user;
    return res.status(201).json({ user });
  } catch(e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: "そのメールアドレスはすでに使用されています。"})
      }
    }
    if (e instanceof z.ZodError) {
      return res.status(400).json({ message: `${e.issues[0].path}: ${e.issues[0].message}`})
    }
    return res.status(500).json({ message: "予期せぬエラーが発生しました。" })
  }
});

authRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("==========================");
    console.log(`Eメール = ${req.body.email}`);
    console.log("==========================");

    const _user: User | null = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    });

    if (_user && await compare(req.body.password, _user.password)) {
      const { password: string, ...user } = _user;
      
      // jwtの作成
      const payload: Payload = {
        id: user.id,
        email: user.email,
        username: user.username
      }
      // const exp: number = 60*60; //有効期限1時間
      // const exp: number = 60; //有効期限1分
      const exp: number = 10; //有効期限10秒

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: exp });
      // console.log(`token => ${token}`)

      return res.status(200).json({ user, token } as LoggedinUser);
    } else {
      return res.status(401).json({ message: "メールアドレス、またはパスワードが違います。" })
    }
  } catch (e: unknown) {
    console.log(e)
    return res.status(500).json({ message: "予期せぬエラーが発生しました" })
  }
})