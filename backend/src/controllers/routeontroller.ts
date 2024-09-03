// src/controllers/routeController.ts

import { Request, Response } from 'express';
import { createRoute, getRoutes, detectRouteOverlaps } from '../services/routeService';

export const createNewRoute = async (req: Request, res: Response) => {
    try {
        const { name, coordinates } = req.body;
        const route = await createRoute(name, coordinates);
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

export const checkRouteOverlaps = async (req: Request, res: Response) => {
    try {
        const overlaps = await detectRouteOverlaps();
        res.status(200).json(overlaps);
    } catch (error) {
        res.status(500).json({ error: 'Error detecting route overlaps' });
    }
};
