
import request from "supertest";
import { describe, expect, jest, test, afterAll, beforeAll } from "@jest/globals"
import { PrismaClient } from "@prisma/client";
import { app } from "../app";
import { uuidRegex, tokenRegex, testUser1, ISO8601regex } from "./testData";

const prisma = new PrismaClient();

describe("POST /auth/register", () => {
  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: testUser1.email
      }
    })
  })

  test("should register a user and get this user", async () => {
    const response = await request(app).post("/auth/register")
      .send({
        email: testUser1.email,
        password: testUser1.password,
        username: testUser1.username
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(201);

    expect(response.body.user.id).toMatch(uuidRegex);
    expect(response.body.user.createdAt).toMatch(ISO8601regex)
    expect(response.body.user.updatedAt).toMatch(ISO8601regex)
    testUser1.id = response.body.user.id;
    testUser1.createdAt = response.body.user.createdAt;
    testUser1.updatedAt = response.body.user.updatedAt;

    delete response.body.user.id
    delete response.body.user.createdAt
    delete response.body.user.updatedAt

    expect(response.body).toStrictEqual({
      user: {
        email: testUser1.email,
        username: testUser1.username,
      }
    })
  });

  test("should be an error due to Unique-Email-Rule", async () => {
    const response = await request(app).post("/auth/register")
      .send({
        email: testUser1.email,
        password: testUser1.password,
        username: testUser1.username
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(400);
    
    expect(response.body).toStrictEqual({
      message: "そのメールアドレスはすでに使用されています。"
    })
  })

  test("should be an error due to Too-Short-Password", async () => {
    const response = await request(app).post("/auth/register")
      .send({
        email: testUser1.email,
        password: "short",
        username: testUser1.username
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(400);
    
    expect(response.body).toStrictEqual({
      message: "password: Must be 8 or more characters long"
    })
  })

  test("should be an error due to Blank-Email", async () => {
    const response = await request(app).post("/auth/register")
      .send({
        password: "short",
        username: testUser1.username
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(400);
    
    expect(response.body).toStrictEqual({
      message: "email: Required"
    })
  })
})

describe("POST /auth/login", () => {

  beforeAll(async () => {
    const response = await request(app).post("/auth/register")
      .send({
        email: testUser1.email,
        password: testUser1.password,
        username: testUser1.username
      })
    testUser1.id = response.body.user.id;
    testUser1.createdAt = response.body.user.createdAt
    testUser1.updatedAt = response.body.user.updatedAt
  })

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: testUser1.email
      }
    })
  })

  test("should login and get a user and a token", async () => {
    const response = await request(app).post("/auth/login")
      .send({
        email: testUser1.email,
        password: testUser1.password
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200);

    expect(response.body.token).toMatch(tokenRegex);

    delete response.body.token;

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

  test("should be an error due to Wrong-Email", async () => {
    const response = await request(app).post("/auth/login")
      .send({
        email: "wrong email",
        password: testUser1.password
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401);


    expect(response.body).toStrictEqual({
      message: "メールアドレス、またはパスワードが違います。"
    })
  })

  test("should be an error due to Wrong-Password", async () => {
    const response = await request(app).post("/auth/login")
      .send({
        email: testUser1.email,
        password: "wrong password"
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401);
    expect(response.body).toStrictEqual({
      message: "メールアドレス、またはパスワードが違います。"
    })
  })
})
