import { Item as ItemType } from "../../../../backend/generated/zod/index"

export const testItem1: ItemType = {
  id: "1",
  word: "test-word-1",
  meaning: "test-meaning-1",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

export const testItem2: ItemType = {
  id: "2",
  word: "test-word-2",
  meaning: "test-meaning-2",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}