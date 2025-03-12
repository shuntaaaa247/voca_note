/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryName,userId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_name_userId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_userId_key" ON "Category"("categoryName", "userId");
