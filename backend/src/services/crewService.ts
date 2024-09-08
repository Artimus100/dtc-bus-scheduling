import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCrew = async (driverName: string, conductorName: string, busId?: string) => {
    try {
        // Find or create the driver
        const driver = await prisma.driver.upsert({
            where: { name: driverName }, // Use unique field for lookup
            update: {}, // No update needed
            create: { name: driverName },
        });

        // Find or create the conductor
        const conductor = await prisma.conductor.upsert({
            where: { name: conductorName }, // Use unique field for lookup
            update: {}, // No update needed
            create: { name: conductorName },
        });

        // Create a new crew entry with optional bus relation
        // const newCrew = await prisma.crew.create({
        //     data: {
        //         driverId: driver.id,
        //         conductorId: conductor.id,
        //         bus: busId ? { connect: { id: busId } } : undefined, // Correct way to handle optional relation
        //     },
        // });

        // return newCrew;
    } catch (error) {
        console.error('Error in createCrew:', error);
        throw error; // Re-throw the error to be caught by the controller
    }
};
