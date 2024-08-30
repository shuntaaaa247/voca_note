import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','username']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','categoryName','userId']);

export const ItemScalarFieldEnumSchema = z.enum(['id','word','meaning','categoryId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().max(255, { message: "Must be 255 or fewer characters long" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
  username: z.string().max(50, {message: "Must be 50 or fewer characters long" }),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string().uuid(),
  categoryName: z.string().max(200, { message: "Must be 100 or fewer characters long" }),
  userId: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// ITEM SCHEMA
/////////////////////////////////////////

export const ItemSchema = z.object({
  id: z.string().uuid(),
  word: z.string().max(300, { message: "Must be 300 or fewer characters long" }),
  meaning: z.string().max(300, { message: "Must be 300 or fewer characters long" }),
  categoryId: z.string(),
})

export type Item = z.infer<typeof ItemSchema>
