import { Express } from "express";
import { User } from "./generated/zod"

export type Payload = {
  id: string,
  email: string,
  username: string
}

export type Decoded = Payload & {
  iat: number,
  exp: number,
}

// declare namespace Express {
//   export interface Request {
//     decoded: string;
//   }
// }

declare global {
  namespace Express {
    interface Request {
      // 拡張される何かのパラメーター
      decoded: Payload
    }
  }
}