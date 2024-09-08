"use strict";
// src/controllers/routeController.ts
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
exports.findRoutesHandler = exports.getRoutesHandler = exports.createRouteHandler = exports.listRoutes = exports.createNewRoute = void 0;
const routeService_1 = require("../services/routeService");
const createNewRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, path } = req.body;
        const route = yield (0, routeService_1.createRoute)(name, path);
        res.status(201).json(route);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating new route' });
    }
});
exports.createNewRoute = createNewRoute;
const listRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routes = yield (0, routeService_1.getRoutes)();
        res.status(200).json(routes);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching routes' });
    }
});
exports.listRoutes = listRoutes;
const createRouteHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, path } = req.body;
    try {
        const route = yield (0, routeService_1.createRoute)(name, path);
        res.status(201).json(route);
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error creating route' });
    }
});
exports.createRouteHandler = createRouteHandler;
const getRoutesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routes = yield (0, routeService_1.getRoutes)(); // Implement this function in your service
        res.status(200).json(routes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching routes' });
    }
});
exports.getRoutesHandler = getRoutesHandler;
const findRoutesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { geoJson } = req.body;
    try {
        const routes = yield (0, routeService_1.findRoutesIntersectingWith)(geoJson);
        res.status(200).json(routes);
    }
    catch (error) {
        res.status(500).json({ error: 'Error finding intersecting routes' });
    }
});
exports.findRoutesHandler = findRoutesHandler;
