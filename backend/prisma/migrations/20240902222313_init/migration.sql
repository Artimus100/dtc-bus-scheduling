/*
  Warnings:

  - The primary key for the `bus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `licensePlate` on the `bus` table. All the data in the column will be lost.
  - You are about to drop the `route` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `number` to the `bus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bus" DROP CONSTRAINT "bus_pkey",
DROP COLUMN "licensePlate",
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "routeId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "bus_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "bus_id_seq";

-- DropTable
DROP TABLE "route";

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crew" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "busId" TEXT,

    CONSTRAINT "crew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignment" (
    "id" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bus" ADD CONSTRAINT "bus_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crew" ADD CONSTRAINT "crew_busId_fkey" FOREIGN KEY ("busId") REFERENCES "bus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "crew"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_busId_fkey" FOREIGN KEY ("busId") REFERENCES "bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
