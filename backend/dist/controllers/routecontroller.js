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
const getAllRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routes = yield (0, postgisQueries_1.getAllRoutes)();
        res.status(200).json(routes);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching routes' });
    }
});
exports.getAllRoutes = getAllRoutes;
const addRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { routeName, geom } = req.body;
        const route = yield (0, postgisQueries_1.createRoute)(routeName, geom);
        res.status(201).json(route);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating route' });
    }
});
exports.addRoute = addRoute;
