
import request from "supertest";
import { app } from "../app";
import { describe, expect, jest, test } from "@jest/globals"

const uuidRegex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
const tokenRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

describe("POST /auth/login", () => {
  test("should login and get a user", async () => {
    const response = await request(app).post("/auth/login")
    .send({
      email: "testjest@test.com",
      password: "password"
    })
    .expect('Content-Type', "application/json; charset=utf-8")
    .expect(200);

    expect(response.body.user.id).toMatch(uuidRegex);
    expect(response.body.token).toMatch(tokenRegex);

    delete response.body.user.id;
    delete response.body.token;

    expect(response.body).toEqual({
      user: {
        email: "testjest@test.com",
        username: "testUserJest"
      }
    })
  })
})
