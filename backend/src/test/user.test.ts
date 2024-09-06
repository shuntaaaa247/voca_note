import request from "supertest";
import { describe, expect, test, beforeAll } from "@jest/globals"
import { app } from "../app";
import { testUser1 } from "./testData";

describe("GET /users/:id and DELETE /users/delete", () => {
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

  test("should be an error because of no token (brank token)", async () => {
    const response = await request(app).get(`/users/${userId}`)
      .set("authorization", "")
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401)

    expect(response.body).toStrictEqual({ 
      message: "トークンが無効です。"
    })
  })

  test("should be an error because of no header-authorization", async () => {
    const response = await request(app).get(`/users/${userId}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401)
    
    expect(response.body).toStrictEqual({
      message: "リクエストヘッダにauthorizationがありません"
    })
  })

  test("should be an error because of wrong token", async () => {
    const response = await request(app).get(`/users/${userId}`)
      .set("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401)

    expect(response.body).toStrictEqual({
      message: "トークンが無効です。"
    })
  })

  test("should be an error because of wrong userId", async () => {
    const response = await request(app).get(`/users/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`)
      .set("authorization", `Bearer ${token}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(404)
    
    expect(response.body).toStrictEqual({
      message: "ユーザーが見つかりませんでした。"
    })
  })

  test("should delete a user", async () => {
    const response = await request(app).delete("/users/delete")
      .set("authorization", `Bearer ${token}`)
      .expect(204)
  })
})