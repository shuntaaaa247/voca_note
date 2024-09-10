import request from "supertest";
import { describe, expect, test, beforeAll } from "@jest/globals"
import { app } from "../app";
import { testUser1 } from "./testData";

let token: string

beforeAll(async () => {
  let response = await request(app).post("/auth/register")
    .send({
      email: testUser1.email,
      password: testUser1.password,
      username: testUser1.username
    })
    .expect(201)
  testUser1.id = response.body.user.id;
  testUser1.createdAt = response.body.user.createdAt
  testUser1.updatedAt = response.body.user.updatedAt

  response = await request(app).post("/auth/login")
    .send({
      email: testUser1.email,
      password: testUser1.password
    })
    .expect(200)
  token = response.body.token;
})

describe("GET /users/:id", () => {
  test("should get a user", async () => {
    const response = await request(app).get(`/users/${testUser1.id}`)
      .set("authorization", `Bearer ${token}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200);

    expect(response.body).toStrictEqual({
      user: {
        id: testUser1.id,
        email: testUser1.email,
        username: testUser1.username,
        createdAt: testUser1.createdAt,
        updatedAt: testUser1.updatedAt
      }
    })
  })

  test("should be an error due to no token (brank token)", async () => {
    const response = await request(app).get(`/users/${testUser1.id}`)
      .set("authorization", "")
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401)

    expect(response.body).toStrictEqual({ 
      message: "トークンが無効です。"
    })
  })

  test("should be an error due to no header-authorization", async () => {
    const response = await request(app).get(`/users/${testUser1.id}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401)
    
    expect(response.body).toStrictEqual({
      message: "リクエストヘッダにauthorizationがありません"
    })
  })

  test("should be an error due to wrong token", async () => {
    const response = await request(app).get(`/users/${testUser1.id}`)
      .set("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401)

    expect(response.body).toStrictEqual({
      message: "トークンが無効です。"
    })
  })

  test("should be an error due to wrong userId", async () => {
    const response = await request(app).get(`/users/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`)
      .set("authorization", `Bearer ${token}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(404)
    
    expect(response.body).toStrictEqual({
      message: "ユーザーが見つかりませんでした。"
    })
  })
})

describe("DELETE /users", () => {
  test("should delete a user", async () => {
    const response = await request(app).delete("/users")
      .set("authorization", `Bearer ${token}`)
      .expect(204)
  })
})