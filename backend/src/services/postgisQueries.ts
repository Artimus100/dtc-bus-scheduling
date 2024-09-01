import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all routes from the database
export const getRoutes = async () => {
  return await prisma.$queryRaw`
    SELECT id, route_name AS "routeName", ST_AsText(geom) AS geom
    FROM "Route";
  `;
};

// Create a new route in the database
export const createRoute = async (routeName: string, coordinates: string) => {
  return await prisma.$executeRaw`
    INSERT INTO "Route" ("routeName", "geom")
    VALUES (${routeName}, ST_GeomFromText(${coordinates}, 4326))
    RETURNING id, route_name AS "routeName", ST_AsText(geom) AS geom;
  `;
};
// Function to get routes near a given location
export const getRoutesNearLocation = async (latitude: number, longitude: number, radius: number) => {
    return await prisma.$queryRaw`
      SELECT * FROM "Route"
      WHERE ST_DWithin(geom, ST_MakePoint(${longitude}, ${latitude})::geography, ${radius})
    `;
  };
  
