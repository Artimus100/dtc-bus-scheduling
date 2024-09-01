CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateTable
CREATE TABLE "Bus" (
    "id" SERIAL NOT NULL,
    "licensePlate" TEXT NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "routeName" TEXT NOT NULL,
    "geom" BYTEA NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);
