/*
  Warnings:

  - You are about to drop the column `busId` on the `Crew` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Crew` table. All the data in the column will be lost.
  - Added the required column `conductorId` to the `Crew` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverId` to the `Crew` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Crew" DROP CONSTRAINT "Crew_busId_fkey";

-- AlterTable
ALTER TABLE "Crew" DROP COLUMN "busId",
DROP COLUMN "name",
ADD COLUMN     "conductorId" TEXT NOT NULL,
ADD COLUMN     "driverId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conductor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Conductor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BusToCrew" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BusToCrew_AB_unique" ON "_BusToCrew"("A", "B");

-- CreateIndex
CREATE INDEX "_BusToCrew_B_index" ON "_BusToCrew"("B");

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_conductorId_fkey" FOREIGN KEY ("conductorId") REFERENCES "Conductor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusToCrew" ADD CONSTRAINT "_BusToCrew_A_fkey" FOREIGN KEY ("A") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusToCrew" ADD CONSTRAINT "_BusToCrew_B_fkey" FOREIGN KEY ("B") REFERENCES "Crew"("id") ON DELETE CASCADE ON UPDATE CASCADE;
