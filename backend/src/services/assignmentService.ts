// src/services/assignmentService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const assignCrewToBus = async (crewId: string, busId: string, startTime: Date, endTime: Date) => {
    try {
        // Validate crew existence
        const crew = await prisma.crew.findUnique({
            where: { id: crewId },
        });
        if (!crew) {
            throw new Error('Crew not found');
        }

        // Validate bus existence
        const bus = await prisma.bus.findUnique({
            where: { id: busId },
        });
        if (!bus) {
            throw new Error('Bus not found');
        }

        // Create assignment
        return await prisma.assignment.create({
            data: {
                crewId,
                busId,
                startTime,
                endTime,
            },
        });
    } catch (error) {
        console.error('Error in assignCrewToBus:', error);
        throw error; // Re-throw the error to be caught by the controller
    }
};
