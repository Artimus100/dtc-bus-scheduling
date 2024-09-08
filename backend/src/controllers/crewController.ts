import { Request, Response } from 'express';
import { createCrew } from '../services/crewService';

export const createNewCrew = async (req: Request, res: Response) => {
    try {
        // Extract conductor's and driver's names from request body
        const { driverName, conductorName, busId } = req.body;
        
        // Call the service to create the crew with driver and conductor details
        const crew = await createCrew(driverName, conductorName, busId);
        
        res.status(201).json(crew);
    } catch (error) {
        console.error('Error in createNewCrew:', error);
        res.status(500).json({ error: 'Error creating new crew member' });
    }
};
