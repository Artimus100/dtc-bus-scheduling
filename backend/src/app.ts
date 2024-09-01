// import express, { Request, Response } from 'express';
// import prisma from './src/utils/db';
// import assignBusesToRoutes from './src/scheduling';
// const app = express();

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
import express from 'express';
import cors from 'cors';
import { getAllRoutes, addRoute } from './controllers/routecontroller';

// Make sure that the file 'routeController.ts' exists in the 'controllers' folder.

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/routes', getAllRoutes);
app.post('/api/routes', addRoute);

export default app;
