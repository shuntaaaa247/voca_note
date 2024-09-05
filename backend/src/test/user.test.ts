import request from "supertest";
import { describe, expect, jest, test, afterAll, beforeAll } from "@jest/globals"
import { PrismaClient } from "@prisma/client";
import { app } from "../app";
import { User } from "../../generated/zod";
import { testUser1 } from "./auth.test";

// const testUser2: User = {

// }

describe("GET /users/:id and /users/delete", () => {
  let userId: string;
  let token: string

  beforeAll(async () => {
    let response = await request(app).post("/auth/register")
      .send({
        email: testUser1.email,
        password: testUser1.password,
        username: testUser1.username
      })
    userId = response.body.user.id;

    response = await request(app).post("/auth/login")
      .send({
        email: testUser1.email,
        password: testUser1.password
      })
    token = response.body.token;
  })

  // afterAll(async () => {
  //   const response = await request(app).
  // })

  test("should get a user", async () => {
    const response = await request(app).get(`/users/${userId}`)
      .set("authorization", `Bearer ${token}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200);

    expect(response.body).toStrictEqual({
      user: {
        id: userId,
        email: testUser1.email,
        username: testUser1.username
      }
    })
  })

  test("should delete a user", async () => {
    const response = await request(app).delete("/users/delete")
      .set("authorization", `Bearer ${token}`)
      .expect(204)
  })
})