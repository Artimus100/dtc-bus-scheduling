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
exports.getRoutesNearLocation = exports.createRoute = exports.getRoutes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all routes from the database
const getRoutes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.$queryRaw `
    SELECT id, route_name AS "routeName", ST_AsText(geom) AS geom
    FROM "Route";
  `;
});
exports.getRoutes = getRoutes;
// Create a new route in the database
const createRoute = (routeName, coordinates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.$executeRaw `
    INSERT INTO "Route" ("routeName", "geom")
    VALUES (${routeName}, ST_GeomFromText(${coordinates}, 4326))
    RETURNING id, route_name AS "routeName", ST_AsText(geom) AS geom;
  `;
});
exports.createRoute = createRoute;
// Function to get routes near a given location
const getRoutesNearLocation = (latitude, longitude, radius) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.$queryRaw `
      SELECT * FROM "Route"
      WHERE ST_DWithin(geom, ST_MakePoint(${longitude}, ${latitude})::geography, ${radius})
    `;
});
exports.getRoutesNearLocation = getRoutesNearLocation;
