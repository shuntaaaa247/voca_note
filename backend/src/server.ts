import express from "express";
import type { Express, Request, Response } from "express";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";

const app: Express = express();
const port = 5000;

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World")
})

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`backend is running on ${port}`)
})