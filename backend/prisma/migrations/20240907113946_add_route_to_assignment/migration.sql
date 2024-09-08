/*
  Warnings:

  - Added the required column `routeId` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "routeId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "crew_idx" ON "Assignment"("crewId");

-- CreateIndex
CREATE INDEX "bus_idx" ON "Assignment"("busId");

-- CreateIndex
CREATE INDEX "route_idx" ON "Assignment"("routeId");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
