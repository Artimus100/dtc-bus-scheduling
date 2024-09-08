import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Store and query geospatial data using PostGIS
export const createRoute = async (name: string, geoJsonPath: string) => {
  const route = await prisma.route.create({
    data: {
      name: name,
      path: geoJsonPath,  // Store GeoJSON string
    },
  });
  return route;
};

export const getRoutes = async () => {
    return await prisma.route.findMany();
};

// Algorithm to detect route overlaps
export const findRoutesIntersectingWith = async (geoJson: string) => {
  try {
      const intersectingRoutes = await prisma.$queryRaw`
          SELECT r1.id AS route1_id, r2.id AS route2_id
          FROM "Route" AS r1, "Route" AS r2
          WHERE ST_Intersects(
              ST_GeomFromGeoJSON(${geoJson}),
              ST_GeomFromGeoJSON(r2.path)
          ) AND r1.id <> r2.id;
      `;
      console.log(intersectingRoutes);
      return intersectingRoutes;
  } catch (error) {
      console.error('Error finding intersecting routes:', error);
      throw error;  // Re-throw error to be caught by the handler
  }
};