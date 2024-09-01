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
exports.addRoute = exports.getAllRoutes = void 0;
const postgisQueries_1 = require("../services/postgisQueries");
// Get all routes
const getAllRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routes = yield (0, postgisQueries_1.getRoutes)();
        res.json(routes);
    }
    catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).send('Server Error');
    }
});
exports.getAllRoutes = getAllRoutes;
// Create a new route
const addRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { routeName, coordinates } = req.body;
    try {
        const route = yield (0, postgisQueries_1.createRoute)(routeName, coordinates);
        res.status(201).json(route);
    }
    catch (error) {
        console.error('Error creating route:', error);
        res.status(500).send('Server Error');
    }
});
exports.addRoute = addRoute;
