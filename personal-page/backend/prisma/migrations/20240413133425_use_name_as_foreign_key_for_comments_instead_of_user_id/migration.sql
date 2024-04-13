/*
  Warnings:

  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `name` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userId",
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_name_fkey" FOREIGN KEY ("name") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
