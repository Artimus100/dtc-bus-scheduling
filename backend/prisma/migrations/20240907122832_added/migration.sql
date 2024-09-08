/*
  Warnings:

  - You are about to drop the `_BusToCrew` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Conductor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_BusToCrew" DROP CONSTRAINT "_BusToCrew_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusToCrew" DROP CONSTRAINT "_BusToCrew_B_fkey";

-- AlterTable
ALTER TABLE "Crew" ADD COLUMN     "busId" TEXT;

-- DropTable
DROP TABLE "_BusToCrew";

-- CreateIndex
CREATE UNIQUE INDEX "Conductor_name_key" ON "Conductor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_name_key" ON "Driver"("name");

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
