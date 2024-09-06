import request from "supertest";
import { describe, expect, test, afterAll, beforeAll } from "@jest/globals"
import { app } from "../app";
import { Category } from "../../generated/zod";
import { uuidRegex, testUser1, testUser2, testCategory1, testCategory2 } from "./testData";

let token: string;

// export let testCategory1: Category = {
//   id: "tentativeId",
//   categoryName: "testCategory1",
//   userId: "tentativeUserId"
// }

// export let testCategory2: Category = {
//   id: "tentativeId",
//   categoryName: "testCategory2",
//   userId: "tentativeUserId"
// }

describe("POST /categories", () => {
  beforeAll(async () => {
    await request(app).post("/auth/register")
      .send({
        email: testUser1.email,
        password: testUser1.password,
        username: testUser1.username
      })

    const response = await request(app).post("/auth/login")
      .send({
        email: testUser1.email,
        password: testUser1.password
      })

    token = response.body.token;
    testUser1.id = response.body.user.id
    testCategory1.userId = testUser1.id
  })

  afterAll(async () => {
    await request(app).delete("/users/delete")
      .set("authorization", `Bearer ${token}`)
  })

  test("should create a category", async () => {
    const response = await request(app).post("/categories")
      .set("authorization", `Bearer ${token}`)
      .send({
        categoryName: testCategory1.categoryName
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(201)
    
    expect(response.body.category.id).toMatch(uuidRegex);
    expect(response.body).toStrictEqual({
      category: {
        id: response.body.category.id,
        categoryName: testCategory1.categoryName,
        userId: testCategory1.userId
      }
    })
    testCategory1.id = response.body.category.id
    testCategory1.userId = response.body.category.userId
  })

  test("should be an error because of same categoryName", async () => {
    const response = await request(app).post("/categories")
      .set("authorization", `Bearer ${token}`)
      .send({
        categoryName: testCategory1.categoryName
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(400)
    
    expect(response.body).toStrictEqual({
      message: "そのカテゴリー名はすでに使用されています。"
    })
  })

  test("should get all my categories", async () => {
    let response = await request(app).post("/categories")
      .set("authorization", `Bearer ${token}`)
      .send({
        categoryName: testCategory2.categoryName
      })

    testCategory2.id = response.body.category.id
    testCategory2.userId = response.body.category.userId

    response = await request(app).get("/categories")
      .set("authorization", `Bearer ${token}`)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200)
    expect(response.body).toStrictEqual({
      categories: [
        testCategory1,
        testCategory2
      ]
    })

  })

})