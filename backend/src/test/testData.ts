import { User, Category, Item } from "../../generated/zod";

export const uuidRegex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
export const tokenRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

export const testUser1: User = {
  id: "testUser1Id",
  email: "test1@test.com",
  password: "password1",
  username: "testUser1"
}

export const testUser2: User = {
  id: "testUser2Id",
  email: "test2@test.com",
  password: "password2",
  username: "testUser2"
}

export const testCategory1: Category = {
  id: "testCategory1Id",
  categoryName: "testCategory1",
  userId: "testCategory1UserId"
}

export const testCategory2: Category = {
  id: "testCategory2Id",
  categoryName: "testCategory2",
  userId: "testCategory2UserId"
}

export const testCategory3: Category = {
  id: "testCategory3Id",
  categoryName: "testCode3",
  userId: "testCategory3UserId"
}

export const testItem1: Item = {
  id: "testItem1ID",
  word: "testItem1Word",
  meaning: "testItem1Meaning",
  categoryId: "testItem1CategoryId",
}

export const testItem2: Item = {
  id: "testItem2ID",
  word: "testItem2Word",
  meaning: "testItem2Meaning",
  categoryId: "testItem2CategoryId",
}

export const testItem3: Item = {
  id: "testItem3ID",
  word: "testItem3Word",
  meaning: "testItem3Meaning",
  categoryId: "testItem3CategoryId",
}