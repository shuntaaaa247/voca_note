import { Express, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Payload, Decoded } from "../../types";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearToken = req.headers["authorization"];
    const bearer = bearToken!.split(" ");
    const token = bearer![1];
    const decodedPayload: Decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as Decoded; 
    req.decoded = decodedPayload;
    next();
  } catch (e: unknown) {
    console.log(e)
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "トークンの有効期限が切れています。" });
    } else if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "トークンが無効です。"});
    }
    if(!req.headers["authorization"]) {
      return res.status(401).json({ message: "リクエストヘッダにauthorizationがありません"})
    }
    return res.status(500).json({ message: "予期せぬエラーが発生しました。" });
  }
}