import { Item as ItemType, Category as CategoryType } from "../../../../backend/generated/zod/index"

const testItem1: ItemType = {
  id: "1",
  word: "test-word-1",
  meaning: "test-meaning-1",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testItem2: ItemType = {
  id: "2",
  word: "test-word-2",
  meaning: "test-meaning-2",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testItem3: ItemType = {
  id: "3",
  word: "test-word-3",
  meaning: "test-meaning-3",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testItem4: ItemType = {
  id: "4",
  word: "test-word-4",
  meaning: "test-meaning-4",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testItem5: ItemType = {
  id: "5",
  word: "test-word-5",
  meaning: "test-meaning-5",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testItem6: ItemType = {
  id: "6",
  word: "test-word-6",
  meaning: "test-meaning-6",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testItem7: ItemType = {
  id: "7",
  word: "test-word-7",
  meaning: "test-meaning-7",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testItem8: ItemType = {
  id: "8",
  word: "test-word-8",
  meaning: "test-meaning-8",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testItem9: ItemType = {
  id: "9",
  word: "test-word-9",
  meaning: "test-meaning-9",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testItem10: ItemType = {
  id: "10",
  word: "test-word-10",
  meaning: "test-meaning-10",
  categoryId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

export const testItems = [
  testItem1,
  testItem2,
  testItem3,
  testItem4,
  testItem5,
  testItem6,
  testItem7,
  testItem8,
  testItem9,
  testItem10
]

const testCategory1: CategoryType = {
  id: "1",
  categoryName: "test-category-1",
  userId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testCategory2: CategoryType = {
  id: "2",
  categoryName: "test-category-2",
  userId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

const testCategory3: CategoryType = {
  id: "3",
  categoryName: "test-category-3",
  userId: "1",
  createdAt: new Date(),
  updatedAt: new Date()
}

export const testCategories = [
  testCategory1,
  testCategory2,
  testCategory3
]

export const longString = "a".repeat(301)


const commitTest = "コミットのテスト"