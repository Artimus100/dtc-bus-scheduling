// src/controllers/busController.ts
import { Request, Response } from 'express';
import { createBus,  linkBusToRoute } from '../services/busService';

export const createNewBus = async (req: Request, res: Response) => {
    try {
        const { number, routeId } = req.body;
        const bus = await createBus(number, routeId);
        res.status(201).json(bus);
    } catch (error) {
        console.error('Error in createNewBus:', error);
        res.status(500).json({ error: 'Error creating new bus' });
    }
};


// export const assignCrew = async (req: Request, res: Response) => {
//     try {
//         const { crewId, busId } = req.body;

//         if (!crewId || !busId) {
//             return res.status(400).json({ error: 'Missing crewId or busId' });
//         }

//         const updatedCrew = await assignCrewToBus(crewId, busId);
//         res.status(200).json(updatedCrew);
//     } catch (error) {
//         console.error('Error in assignCrew controller:', error);
//         res.status(500).json({ error: (error as any).message });
//     }
// };

export const linkBus = async (req: Request, res: Response) => {
    try {
        const { busId, routeId } = req.body;
        const updatedBus = await linkBusToRoute(busId, routeId);
        res.status(200).json(updatedBus);
    } catch (error) {
        res.status(500).json({ error: 'Error linking bus to route' });
    }
};
