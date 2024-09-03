import { Request, Response } from 'express';
import { linkedDutyScheduling, unlinkedDutyScheduling } from '../services/schedulingServices';

export const scheduleLinkedDuty = async (req: Request, res: Response) => {
    try {
        const assignments = await linkedDutyScheduling();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Error scheduling linked duties' });
    }
};

export const scheduleUnlinkedDuty = async (req: Request, res: Response) => {
    try {
        const assignments = await unlinkedDutyScheduling();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Error scheduling unlinked duties' });
    }
};
