// src/controllers/crewController.ts
import { Request, Response } from 'express';
import { createCrew } from '../services/crewService';

export const createNewCrew = async (req: Request, res: Response) => {
    try {
        const { name, busId } = req.body;
        const crew = await createCrew(name, busId);
        res.status(201).json(crew);
    } catch (error) {
        console.error('Error in createNewCrew:', error);
        res.status(500).json({ error: 'Error creating new crew member' });
    }
};
