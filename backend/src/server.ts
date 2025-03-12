import { app } from "./app"
import "dotenv/config"

const port: number = Number(process.env.PORT) || 5000;

app.listen(port, () => {
  console.log(`backend is running on ${port}`)
})