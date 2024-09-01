"use strict";
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// // Function to create a route with geospatial data
// export const createRoute = async (routeName: string, geom: string) => {
//   await prisma.$executeRaw`
//     INSERT INTO "Route" ("routeName", "geom")
//     VALUES (${routeName}, ST_GeomFromText(${geom}, 4326))
//   `;
// };
// // Function to get routes near a given location
// export const getRoutesNearLocation = async (latitude: number, longitude: number, radius: number) => {
//   return await prisma.$queryRaw`
//     SELECT * FROM "Route"
//     WHERE ST_DWithin(geom, ST_MakePoint(${longitude}, ${latitude})::geography, ${radius})
//   `;
// };
// // Add other PostGIS-related functions here
