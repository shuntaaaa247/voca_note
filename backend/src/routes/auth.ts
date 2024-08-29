import { Router, Request, Response, NextFunction } from "express";
import { UserSchema, User } from "../../generated/zod";
import { PrismaClient, Prisma } from "@prisma/client";
import { newUser, Payload } from "../../types";
import { z } from "zod";
import { hash, compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"

const prisma = new PrismaClient();
export const authRouter = Router();

// type newUser = Omit<User, "id">

authRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: newUser = UserSchema.omit({"id": true}).parse(req.body);
    userData.password = await hash(req.body.password, 10);
    console.log(userData);
    const user = await prisma.user.create({
      data: userData
    })
    return res.status(200).json({ message: "ユーザー登録完了", user });
  } catch(e: unknown) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: "そのメールアドレスはすでに使用されています。"})
      }
    }
    if (e instanceof z.ZodError) {
      if ((e.issues[0].code = "invalid_type") && (!req.body.email || !req.body.password || !req.body.username)) {
        console.log(e.issues);
        return res.status(400).json({ message: "必須パラメータがありません。" })
      }
    }
    return res.status(500).json({ message: "予期せぬエラーが発生しました。" })
  }
});

authRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _user: User | null = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    });

    if (_user && await compare(req.body.password, _user.password)) {
      const { password: string, ...user } = _user;

      const payload: Payload = {
        id: user.id,
        email: user.email,
        username: user.username
      }
      const exp: number = 60*5; //有効期限5分
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: exp });
      console.log(`token => ${token}`)

      return res.status(200).json({ message: "ユーザー取得完了", user, token });
    } else {
      return res.status(401).json({ message: "メールアドレス、またはパスワードが違います。" })
    }
  } catch (e: unknown) {
    return res.status(500).json({ message: "予期せぬエラーが発生しました" })
  }
})