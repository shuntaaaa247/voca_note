import request from "supertest";
import { describe, expect, test, afterAll, beforeAll } from "@jest/globals"
import { app } from "../app";
import { uuidRegex, testUser1,  ISO8601regex, testUser2, testCategory1, testCategory2, testCategory3, testItem1, testItem2, testItem3, testItem4, testItem5, testItem6 } from "./testData";
import { Item } from "../../generated/zod";

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

  let response = await request(app).post("/auth/login")
    .send({
      email: testUser1.email,
      password: testUser1.password
    })
    .expect(200)
  token1 = response.body.token;
  testUser1.id = response.body.user.id;
  testUser1.createdAt = response.body.createdAt;
  testUser1.updatedAt = response.body.updatedAt;
  // testCategory1.userId = testUser1.id

  response = await request(app).post("/auth/login")
    .send({
      email: testUser2.email,
      password: testUser2.password
    })
    .expect(200)
  token2 = response.body.token;
  testUser2.id = response.body.user.id
  testUser2.createdAt = response.body.createdAt;
  testUser2.updatedAt = response.body.updatedAt;
  testCategory2.userId = testUser1.id

  response = await request(app).post("/categories")
    .set("authorization", `Bearer ${token1}`)
    .send({
      categoryName: testCategory1.categoryName
    })
    .expect(201)
  testCategory1.id = response.body.category.id
  testCategory1.userId = response.body.category.userId
})

afterAll(async () => {
  await request(app).delete("/users")
    .set("authorization", `Bearer ${token1}`)
    .expect(204)

  await request(app).delete("/users")
    .set("authorization", `Bearer ${token2}`)
    .expect(204)
})


describe("POST /categories/:categoryId/items", () => {
  test("should create a item", async () => {
    const response = await request(app).post(`/categories/${testCategory1.id}/items`)
      .set("authorization", `Bearer ${token1}`)
      .send({
        word: testItem1.word,
        meaning: testItem1.meaning
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(201)

    expect(response.body.item.id).toMatch(uuidRegex)
    expect(response.body.item.createdAt).toMatch(ISO8601regex)
    expect(response.body.item.updatedAt).toMatch(ISO8601regex)
    testItem1.id = response.body.item.id
    testItem1.categoryId = response.body.item.categoryId
    testItem1.createdAt = response.body.item.createdAt
    testItem1.updatedAt = response.body.item.updatedAt

    expect(response.body).toStrictEqual({
      item: {
        id: testItem1.id,
        word: testItem1.word,
        meaning: testItem1.meaning,
        categoryId: testCategory1.id,
        createdAt: testItem1.createdAt,
        updatedAt: testItem1.updatedAt
      }
    })
  })

  test("should be an error because word is empty", async () => {
    const response = await request(app).post(`/categories/${testCategory1.id}/items`)
      .set("authorization", `Bearer ${token1}`)
      .send({
        word: "",
        meaning: testItem1.meaning
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(400)
    
    expect({
      message: "word: word is required"
    })
  })

  test("should be an error because meaning is empty", async () => {
    const response = await request(app).post(`/categories/${testCategory1.id}/items`)
      .set("authorization", `Bearer ${token1}`)
      .send({
        word: "",
        meaning: testItem1.meaning
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(400)
    
    expect({
      message: "meaning: meaning is required"
    })
  })
})

describe("GET /categories/:categoryId/items", () => {
  beforeAll(async () => {
    let response = await request(app).post("/categories")
      .set("authorization", `Bearer ${token2}`)
      .send({
        categoryName: testCategory2.categoryName
      })
      .expect(201)
    testCategory2.id = response.body.category.id
    testCategory2.userId = response.body.category.userId

    response = await request(app).post(`/categories/${testCategory2.id}/items`)
      .set("authorization", `Bearer ${token2}`)
      .send({
        word: testItem2.word,
        meaning: testItem2.meaning
      })
      .expect(201)
    testItem2.id = response.body.item.id,
    testItem2.categoryId = testCategory2.id
    testItem2.createdAt = response.body.item.createdAt
    testItem2.updatedAt = response.body.item.updatedAt

    const testItems: Item[] = [testItem3, testItem4, testItem5, testItem6];

    for (const testItem of testItems) {
      const response = await request(app).post(`/categories/${testCategory1.id}/items`)
        .set("authorization", `Bearer ${token1}`)
        .send({
          word: testItem.word,
          meaning: testItem.meaning
        })
        .expect(201)
      testItem.id = response.body.item.id,
      testItem.categoryId = testCategory1.id
      testItem.createdAt = response.body.item.createdAt
      testItem.updatedAt = response.body.item.updatedAt
    }
  })

  test("should get 3 items in testCategory1 (oldest to newest)", async () => {
    const response = await request(app).get(`/categories/${testCategory1.id}/items?limit=3`)
      .set("authorization", `Bearer ${token1}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200)
    expect(response.body).toStrictEqual({
      items: [
        testItem1,
        testItem3,
        testItem4
      ]
    })
  })

  test("should get 3 items created after testItem3 in testCategory1 (oldest to newest)", async () => {
    const response = await request(app).get(`/categories/${testCategory1.id}/items?cursor=${testItem3.createdAt}&limit=3`)
      .set("authorization", `Bearer ${token1}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200)
    expect(response.body).toStrictEqual({
      items: [
        testItem4,
        testItem5,
        testItem6
      ]
    })
  })

  test("should get 3 items created after testItem3 in testCategory1 (newest to oldest)", async () => {
    const response = await request(app).get(`/categories/${testCategory1.id}/items?cursor=${testItem3.createdAt}&limit=3&order=latest`)
      .set("authorization", `Bearer ${token1}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200)
    expect(response.body).toStrictEqual({
      items: [
        testItem6,
        testItem5,
        testItem4
      ]
    })
  })
  

  test("should be an error due to no authority", async () => {
    const response = await request(app).get(`/categories/${testCategory1.id}/items`)
      .set("authorization", `Bearer ${token2}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(403)
    expect(response.body).toStrictEqual({
      message: "権限がありません。"
    })
  })
})

describe("PATCH /categories/:categoryId/items/:itemId", () => {
  test("should edit a item (word and meaning propaties)", async () => {
    const response = await request(app).patch(`/categories/${testCategory1.id}/items/${testItem1.id}`)
      .set("authorization", `Bearer ${token1}`)
      .send({
        word: `${testItem1.word}(Edited)`,
        meaning: `${testItem1.meaning}(Edited)`
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200)
    expect(response.body.item.updatedAt).toMatch(ISO8601regex)
    testItem1.updatedAt = response.body.item.updatedAt
    expect(response.body).toStrictEqual({
      item: {
        id: testItem1.id,
        word: `${testItem1.word}(Edited)`,
        meaning: `${testItem1.meaning}(Edited)`,
        categoryId: testItem1.categoryId,
        createdAt: testItem1.createdAt,
        updatedAt: testItem1.updatedAt
      }
    })
  })

  test("should be an error due to wrong categoryId", async () => {
    const response = await request(app).patch(`/categories/d532c62b-7f46-6c61-c70f-7b05ee881f70/items/${testItem1.id}`)
      .set("authorization", `Bearer ${token1}`)
      .send({
        word: `${testItem1.word}(Edited)`,
        meaning: `${testItem1.meaning}(Edited)`
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(404)
    expect(response.body).toStrictEqual({
      message: "カテゴリーが見つかりませんでした。"
    })
  })

  test("should be an error due to wrong itemId", async () => {
    const response = await request(app).patch(`/categories/${testCategory1.id}/items/d532c62b-7f46-6c61-c70f-7b05ee881f70`)
      .set("authorization", `Bearer ${token1}`)
      .send({
        word: `${testItem1.word}(Edited)`,
        meaning: `${testItem1.meaning}(Edited)`
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(404)
    expect(response.body).toStrictEqual({
      message: "アイテムが見つかりませんでした。"
    })
  })
})

describe("DELETE /categories/:categoryId/items/:itemId", () => {
  test("should delete testItem1", async () => {
    let response = await request(app).delete(`/categories/${testCategory1.id}/items/${testItem1.id}`)
      .set("authorization", `Bearer ${token1}`)
      // .expect('Content-Type', "applica/tion/json; charset=utf-8")
      .expect(204)
    
    response = await request(app).get(`/categories/${testCategory1.id}/items`)
      .set("authorization", `Bearer ${token1}`)
      .expect(200)
    expect(response.body).toStrictEqual({
      items: [
        testItem3,
        testItem4, 
        testItem5,
        testItem6
      ]
    })
  })

  test("should be an error due to no authority", async () => {
    const response = await request(app).delete(`/categories/${testCategory1.id}/items/${testItem3.id}`)
      .set("authorization", `Bearer ${token2}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(403)
    expect(response.body).toStrictEqual({
      message: "権限がありません。"
    })
  })

  test("should be an error due to wrong categoryId", async () => {
    const response = await request(app).delete(`/categories/d532c62b-7f46-6c61-c70f-7b05ee881f70/items/${testItem3.id}`)
      .set("authorization", `Bearer ${token1}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(404)
    expect(response.body).toStrictEqual({
      message: "カテゴリーが見つかりませんでした。"
    })
  })

  test("should be an error due to wrong itemId", async () => {
    const response = await request(app).delete(`/categories/${testCategory1.id}/items/d532c62b-7f46-6c61-c70f-7b05ee881f70`)
      .set("authorization", `Bearer ${token1}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(404)
    expect(response.body).toStrictEqual({
      message: "アイテムが見つかりませんでした。"
    })
  })
})