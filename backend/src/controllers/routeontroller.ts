// src/controllers/routeController.ts

import { Request, Response } from 'express';
import { createRoute, findRoutesIntersectingWith, getRoutes } from '../services/routeService';



export const createNewRoute = async (req: Request, res: Response) => {
    try {
        const { name, path } = req.body;
        const route = await createRoute(name, path);
        res.status(201).json(route);
    } catch (error) {
        res.status(500).json({ error: 'Error creating new route' });
    }
};

export const listRoutes = async (req: Request, res: Response) => {
    try {
        const routes = await getRoutes();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching routes' });
    }
};

export const createRouteHandler = async (req: Request, res: Response) => {
    const { name, path } = req.body;
    try {
        const route = await createRoute(name, path);
        res.status(201).json(route);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error creating route' });
    }
};
export const getRoutesHandler = async (req: Request, res: Response) => {
    try {
      const routes = await getRoutes(); // Implement this function in your service
      res.status(200).json(routes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching routes' });
    }
  };
  export const findRoutesHandler = async (req: Request, res: Response) => {
    const { geoJson } = req.body;
    try {
      const routes = await findRoutesIntersectingWith(geoJson);
      res.status(200).json(routes);
    } catch (error) {
      res.status(500).json({ error: 'Error finding intersecting routes' });
    }
  };
