"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRoutesIntersectingWith = exports.getRoutes = exports.createRoute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Store and query geospatial data using PostGIS
const createRoute = (name, geoJsonPath) => __awaiter(void 0, void 0, void 0, function* () {
    const route = yield prisma.route.create({
        data: {
            name: name,
            path: geoJsonPath, // Store GeoJSON string
        },
    });
    return route;
});
exports.createRoute = createRoute;
const getRoutes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.route.findMany();
});
exports.getRoutes = getRoutes;
// Algorithm to detect route overlaps
const findRoutesIntersectingWith = (geoJson) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const intersectingRoutes = yield prisma.$queryRaw `
          SELECT r1.id AS route1_id, r2.id AS route2_id
          FROM "Route" AS r1, "Route" AS r2
          WHERE ST_Intersects(
              ST_GeomFromGeoJSON(${geoJson}),
              ST_GeomFromGeoJSON(r2.path)
          ) AND r1.id <> r2.id;
      `;
        console.log(intersectingRoutes);
        return intersectingRoutes;
    }
    catch (error) {
        console.error('Error finding intersecting routes:', error);
        throw error; // Re-throw error to be caught by the handler
    }
});
exports.findRoutesIntersectingWith = findRoutesIntersectingWith;
