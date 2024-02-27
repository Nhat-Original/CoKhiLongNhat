/*
  Warnings:

  - You are about to drop the column `isPublised` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isPublised",
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;
