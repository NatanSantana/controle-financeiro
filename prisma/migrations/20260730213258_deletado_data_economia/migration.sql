/*
  Warnings:

  - You are about to drop the column `data` on the `economia` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUser]` on the table `economia` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "economia" DROP COLUMN "data";

-- CreateIndex
CREATE UNIQUE INDEX "economia_idUser_key" ON "economia"("idUser");
