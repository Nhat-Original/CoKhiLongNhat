/*
  Warnings:

  - A unique constraint covering the columns `[simplifiedName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[simplifiedName]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `simplifiedName` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `simplifiedName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "simplifiedName" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "simplifiedName" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_simplifiedName_key" ON "Category"("simplifiedName");

-- CreateIndex
CREATE UNIQUE INDEX "Product_simplifiedName_key" ON "Product"("simplifiedName");
