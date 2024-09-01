import { Request, Response } from 'express';
import { getRoutes, createRoute } from '../services/postgisQueries';
// Get all routes
export const getAllRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await getRoutes();
    res.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).send('Server Error');
  }
};

// Create a new route
export const addRoute = async (req: Request, res: Response) => {
  const { routeName, coordinates } = req.body;
  
  try {
    const route = await createRoute(routeName, coordinates);
    res.status(201).json(route);
  } catch (error) {
    console.error('Error creating route:', error);
    res.status(500).send('Server Error');
  }
};
