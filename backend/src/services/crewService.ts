// src/services/crewService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCrew = async (name: string, busId?: string) => {
    try {
        // Optional: Validate if busId exists
        if (busId) {
            const bus = await prisma.bus.findUnique({
                where: { id: busId },
            });
            if (!bus) {
                throw new Error('Bus not found');
            }
        }

        return await prisma.crew.create({
            data: { name, busId },
        });
    } catch (error) {
        console.error('Error in createCrew:', error);
        throw error; // Re-throw the error to be caught by the controller
    }
};
