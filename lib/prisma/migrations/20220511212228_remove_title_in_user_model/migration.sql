/*
  Warnings:

  - You are about to drop the column `authorId` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_authorId_fkey";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "authorId",
DROP COLUMN "title",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
