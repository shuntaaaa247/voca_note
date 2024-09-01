
import request from "supertest";
import { app } from "../app";
import { describe, expect, jest, test } from "@jest/globals"
import { User } from "../../generated/zod";

const uuidRegex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
const tokenRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

const testUser1: User = {
  id: "tentativeId",
  email: "jest1@test.com",
  password: "password",
  username: "jestUser1"
}

describe("POST /auth/register", () => {
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
    testUser1.id = response.body.user.id;

    delete response.body.user.id

    expect(response.body).toEqual({
      user: {
        email: testUser1.email,
        username: testUser1.username,
      }
    })
  });

  test("should be an error because of Unique-Email-Rule", async () => {
    const response = await request(app).post("/auth/register")
      .send({
        email: testUser1.email,
        password: testUser1.password,
        username: testUser1.username
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(400);
    
    expect(response.body).toEqual({
      message: "そのメールアドレスはすでに使用されています。"
    })
  })

  test("should be an error because of Too-Short-Password", async () => {
    const response = await request(app).post("/auth/register")
      .send({
        email: testUser1.email,
        password: "short",
        username: testUser1.username
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(400);
    
    expect(response.body).toEqual({
      message: "password: Must be 8 or more characters long"
    })
  })

  test("should be an error because of Blank-Email", async () => {
    const response = await request(app).post("/auth/register")
      .send({
        password: "short",
        username: testUser1.username
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(400);
    
    expect(response.body).toEqual({
      message: "email: Required"
    })
  })
})

describe("POST /auth/login", () => {
  test("should login and get a user", async () => {
    const response = await request(app).post("/auth/login")
      .send({
        email: testUser1.email,
        password: testUser1.password
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200);

    expect(response.body.token).toMatch(tokenRegex);

    delete response.body.token;

    expect(response.body).toEqual({
      user: {
        id: testUser1.id,
        email: testUser1.email,
        username: testUser1.username
      }
    })
  })

  test("should be an error because of Wrong-Email", async () => {
    const response = await request(app).post("/auth/login")
      .send({
        email: "wrong email",
        password: testUser1.password
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401);


    expect(response.body).toEqual({
      message: "メールアドレス、またはパスワードが違います。"
    })
  })

  test("should be an error because of Wrong-Password", async () => {
    const response = await request(app).post("/auth/login")
      .send({
        email: testUser1.email,
        password: "wrong password"
      })
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401);


    expect(response.body).toEqual({
      message: "メールアドレス、またはパスワードが違います。"
    })
  })
})
