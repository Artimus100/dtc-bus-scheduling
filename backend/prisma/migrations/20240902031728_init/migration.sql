/*
  Warnings:

  - You are about to drop the `Bus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Bus";

-- DropTable
DROP TABLE "Route";

-- CreateTable
CREATE TABLE "bus" (
    "id" SERIAL NOT NULL,
    "licensePlate" TEXT NOT NULL,

    CONSTRAINT "bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route" (
    "id" SERIAL NOT NULL,
    "routeName" TEXT NOT NULL,
    "geom" BYTEA NOT NULL,

    CONSTRAINT "route_pkey" PRIMARY KEY ("id")
);
