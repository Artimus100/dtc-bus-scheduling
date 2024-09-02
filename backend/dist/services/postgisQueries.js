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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoutes = exports.createRoute = void 0;
const db_1 = __importDefault(require("../utils/db"));
const createRoute = (routeName, geom) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update the function call to use the correct SRID in PostGIS
        const result = yield db_1.default.$executeRaw `
        INSERT INTO "route" ("routeName", "geom")
        VALUES (${routeName}, ST_GeomFromText(${geom}, 4326))
        RETURNING *;
      `;
        return result;
    }
    catch (error) {
        console.error('Error creating route:', error);
        throw error;
    }
});
exports.createRoute = createRoute;
const getAllRoutes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routes = yield db_1.default.$queryRaw `SELECT * FROM "route"`;
        return routes;
    }
    catch (error) {
        console.error('Error fetching routes:', error);
        throw error;
    }
});
exports.getAllRoutes = getAllRoutes;
