import prisma from '../utils/db';

export const createRoute = async (routeName: string, geom: string) => {
    try {
      // Update the function call to use the correct SRID in PostGIS
      const result = await prisma.$executeRaw`
        INSERT INTO "Route" ("routeName", "geom")
        VALUES (${routeName}, ST_GeomFromText(${geom}, 4326))
        RETURNING *;
      `;
      return result;
    } catch (error) {
      console.error('Error creating route:', error);
      throw error;
    }
  };

export const getAllRoutes = async () => {
  try {
    const routes = await prisma.$queryRaw`SELECT * FROM "Route"`;
    return routes;
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }
};
