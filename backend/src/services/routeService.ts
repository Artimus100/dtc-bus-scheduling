import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Store and query geospatial data using PostGIS
export const createRoute = async (name: string, coordinates: string) => {
    const route = await prisma.route.create({
        data: {
            name,
            coordinates,
        },
    });
    return route;
};

export const getRoutes = async () => {
    return await prisma.route.findMany();
};

// Algorithm to detect route overlaps
export const detectRouteOverlaps = async () => {
    // Example query using PostGIS functions
    const overlaps = await prisma.$queryRaw(
        Prisma.sql`
            SELECT r1.name AS route1, r2.name AS route2
            FROM "Route" r1, "Route" r2
            WHERE ST_Overlaps(r1.coordinates::geometry, r2.coordinates::geometry)
            AND r1.id <> r2.id;
        `
    );
    return overlaps;
};
