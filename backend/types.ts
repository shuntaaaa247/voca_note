import { User } from "./generated/zod"

export type newUser = Omit<User, "id">

export type Payload = {
  id: string,
  email: string,
  username: string
}
