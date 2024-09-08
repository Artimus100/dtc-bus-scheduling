-- Add the 'path' column as nullable
ALTER TABLE "Route" ADD COLUMN "path" TEXT;

-- Optionally, set a default value for existing rows
UPDATE "Route" SET "path" = '{}' WHERE "path" IS NULL;

-- Drop the 'coordinates' column
ALTER TABLE "Route" DROP COLUMN "coordinates";

-- Alter the 'path' column to be non-nullable
ALTER TABLE "Route" ALTER COLUMN "path" SET NOT NULL;
