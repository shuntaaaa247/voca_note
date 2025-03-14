import express from "express";
import type { Express, Request, Response } from "express";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { categoryRouter } from "./routes/category";
import { itemRouter } from "./routes/item";
import cors from "cors"

export const app: Express = express();

app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({message: "Hello World"})
})

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/categories", itemRouter);