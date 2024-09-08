import { Request, Response } from 'express';
import { assignCrewToBus } from '../services/assignmentService';

export const createAssignment = async (req: Request, res: Response) => {
    try {
        const { crewId, busId, routeId, startTime, endTime } = req.body;
        const assignment = await assignCrewToBus(crewId, busId, routeId, new Date(startTime), new Date(endTime));
        res.status(201).json(assignment);
    } catch (error) {
        console.error('Error in createAssignment:', error);
        res.status(500).json({ error: 'Error assigning crew, bus, and route' });
    }
};
