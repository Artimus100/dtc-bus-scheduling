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
exports.detectRouteOverlaps = exports.getRoutes = exports.createRoute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Store and query geospatial data using PostGIS
const createRoute = (name, coordinates) => __awaiter(void 0, void 0, void 0, function* () {
    const route = yield prisma.route.create({
        data: {
            name,
            coordinates,
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
const detectRouteOverlaps = () => __awaiter(void 0, void 0, void 0, function* () {
    // Example query using PostGIS functions
    const overlaps = yield prisma.$queryRaw(client_1.Prisma.sql `
            SELECT r1.name AS route1, r2.name AS route2
            FROM "Route" r1, "Route" r2
            WHERE ST_Overlaps(r1.coordinates::geometry, r2.coordinates::geometry)
            AND r1.id <> r2.id;
        `);
    return overlaps;
});
exports.detectRouteOverlaps = detectRouteOverlaps;
