import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`backend is running on ${port}`)
})