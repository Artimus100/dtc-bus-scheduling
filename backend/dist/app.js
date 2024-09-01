"use strict";
// import express, { Request, Response } from 'express';
// import prisma from './src/utils/db';
// import assignBusesToRoutes from './src/scheduling';
// const app = express();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.get('/api/routes', async (req: Request, res: Response) => {
//   try {
//     const routes = await prisma.route.findMany();
//     res.json(routes);
//   } catch (err) {
//     console.error((err as Error).message);
//     res.status(500).send('Server Error');
//   }
// });
// app.get('/api/schedule', async (req: Request, res: Response) => {
//   try {
//     const buses = await prisma.bus.findMany();
//     const routes = await prisma.route.findMany();
//     const schedule = assignBusesToRoutes(buses, routes);
//     res.json(schedule);
//   } catch (err) {
//     console.error((err as Error).message);
//     res.status(500).send('Server Error');
//   }
// });
// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routecontroller_1 = require("./controllers/routecontroller");
// Make sure that the file 'routeController.ts' exists in the 'controllers' folder.
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get('/api/routes', routecontroller_1.getAllRoutes);
app.post('/api/routes', routecontroller_1.addRoute);
exports.default = app;
