import { Request, Response } from 'express';
import { createRoute as createRouteInDB, getAllRoutes as fetchAllRoutesFromDB } from '../services/postgisQueries';

export const getAllRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await fetchAllRoutesFromDB();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching routes' });
  }
};

export const addRoute = async (req: Request, res: Response) => {
  try {
    const { routeName, geom } = req.body;
    const route = await createRouteInDB(routeName, geom);
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ error: 'Error creating route' });
  }
};
