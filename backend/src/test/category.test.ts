import request from "supertest";
import { describe, expect, test, afterAll, beforeAll } from "@jest/globals"
import { app } from "../app";
import { uuidRegex, testUser1, testUser2, testCategory1, testCategory2, testCategory3, ISO8601regex } from "./testData";

let token1: string;
let token2: string;

beforeAll(async () => {
  await request(app).post("/auth/register")
    .send({
      email: testUser1.email,
      password: testUser1.password,
      username: testUser1.username
    })
    .expect(201)
  
  await request(app).post("/auth/register")
    .send({
      email: testUser2.email,
      password: testUser2.password,
      username: testUser2.username
    })
    .expect(201)

  const response = await request(app).post("/auth/login")
    .send({
      email: testUser1.email,
      password: testUser1.password
    })
    .expect(200)

  token1 = response.body.token;
  testUser1.id = response.body.user.id

})

afterAll(async () => {
  await request(app).delete("/users")
    .set("authorization", `Bearer ${token1}`)
    .expect(204)

  await request(app).delete("/users")
    .set("authorization", `Bearer ${token2}`)
    .expect(204)
})

describe("POST /categories", () => {
  test("should create a category", async () => {
    const response = await request(app).post("/categories")
      .set("authorization", `Bearer ${token1}`)
      .send({
        categoryName: testCategory1.categoryName
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(201)
    
    expect(response.body.category.id).toMatch(uuidRegex);
    expect(response.body.category.createdAt).toMatch(ISO8601regex);
    expect(response.body.category.updatedAt).toMatch(ISO8601regex);
    testCategory1.id = response.body.category.id;
    testCategory1.userId = testUser1.id
    testCategory1.createdAt = response.body.category.createdAt
    testCategory1.updatedAt = response.body.category.updatedAt
    expect(response.body).toStrictEqual({
      category: {
        id: testCategory1.id,
        categoryName: testCategory1.categoryName,
        userId: testCategory1.userId,
        createdAt: testCategory1.createdAt,
        updatedAt: testCategory1.updatedAt
      }
    })
  })

  test("should be an error because of same categoryName", async () => {
    const response = await request(app).post("/categories")
      .set("authorization", `Bearer ${token1}`)
      .send({
        categoryName: testCategory1.categoryName
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(400)
    
    expect(response.body).toStrictEqual({
      message: "そのカテゴリー名はすでに使用されています。"
    })
  })
})

describe("GET /categories/:id", () => {
  beforeAll(async () => {
    let response = await request(app).post("/auth/login")
      .send({
        email: testUser2.email,
        password: testUser2.password
      })
      .expect(200)
    token2 = response.body.token;

    response = await request(app).post("/categories")
      .set("authorization", `Bearer ${token2}`)
      .send({
        categoryName: testCategory2.categoryName
      })
      .expect(201)
    
    testCategory2.id = response.body.category.id;
    testCategory2.userId = response.body.category.userId;
    testCategory2.createdAt = response.body.category.createdAt;
    testCategory2.updatedAt = response.body.category.updatedAt;

    response = await request(app).post("/categories")
      .set("authorization", `Bearer ${token1}`)
      .send({
        categoryName: testCategory3.categoryName
      })
      .expect(201)

    testCategory3.id = response.body.category.id;
    testCategory3.userId = response.body.category.userId;
    testCategory3.createdAt = response.body.category.createdAt;
    testCategory3.updatedAt = response.body.category.updatedAt;
  })

  test("should get testUser1's all categories", async () => {
    const response = await request(app).get("/categories")
      .set("authorization", `Bearer ${token1}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200)
    expect(response.body).toStrictEqual({
      categories: [
        testCategory1,
        testCategory3
      ]
    })
  })
})

describe("DELETE /categories/:categoryId", () => {
  test("should delete a category", async () => {
    let response = await request(app).delete(`/categories/${testCategory1.id}`)
      .set("authorization", `Bearer ${token1}`)
      .expect(204)

    response = await request(app).get("/categories")
      .set("authorization", `Bearer ${token1}`)
    
    expect(response.body).toStrictEqual({
      categories: [
        testCategory3
      ]
    })
  })

  test("should be an error due to no authority", async () => {
    const response = await request(app).delete(`/categories/${testCategory2.id}`)
      .set("authorization", `Bearer ${token1}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(403)

    expect(response.body).toStrictEqual({
      message: "権限がありません。"
    })
  })

  test("should be an error due to wrong categoryId", async () => {
    const response = await request(app).delete(`/categories/${testCategory1.id}`)
      .set("authorization", `Bearer ${token1}`)
      .send({
        categoryId: "99a81e0f-a806-71dd-d76f-e13e572cea2a"
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(404)

    expect(response.body).toStrictEqual({
      message: "カテゴリーが見つかりませんでした。"
    })
  })
})

describe("PATCH /categories/:categoryId", () => {
  const newCategory3Name: string = `${testCategory3.categoryName}Edited`
  test("should edit category3", async () => {
    const response = await request(app).patch(`/categories/${testCategory3.id}`)
      .set("authorization", `Bearer ${token1}`)
      .send({
        newCategoryName: newCategory3Name
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200)
    expect(response.body.category.updatedAt).toMatch(ISO8601regex)
    testCategory3.updatedAt = response.body.category.updatedAt
    expect(response.body).toStrictEqual({
      category: {
        id: testCategory3.id,
        categoryName: newCategory3Name,
        userId: testCategory3.userId,
        createdAt: testCategory3.createdAt,
        updatedAt: testCategory3.updatedAt
      }
    })
  })

  test("should be an error due to wrong categoryId", async () => {
    const response = await request(app).patch(`/categories/d532c62b-7f46-6c61-c70f-7b05ee881f70`)
      .set("authorization", `Bearer ${token1}`)
      .send({
        newCategoryName: newCategory3Name
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(404)
    expect(response.body).toStrictEqual({
      message: "カテゴリーが見つかりませんでした。"
    })
  })
})