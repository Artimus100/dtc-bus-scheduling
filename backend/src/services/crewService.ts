import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCrew = async (driverName: string, conductorName: string, busId?: string) => {
    try {
        // Ensure driverName and conductorName are not undefined or empty
        if (!driverName || !conductorName) {
            throw new Error("Driver name and conductor name must be provided");
        }

        // Upsert the driver
        const driver = await prisma.driver.upsert({
            where: { name: driverName },
            update: {}, // No updates needed
            create: { name: driverName }, // Create if not found
        });

        // Upsert the conductor
        const conductor = await prisma.conductor.upsert({
            where: { name: conductorName },
            update: {}, // No updates needed
            create: { name: conductorName }, // Create if not found
        });

        // Create the crew and optionally link to a bus
        const newCrew = await prisma.crew.create({
            data: {
                driverId: driver.id,
                conductorId: conductor.id,
                busId: busId || undefined, // Optional linking to bus
            },
        });

        return newCrew;
    } catch (error) {
        console.error('Error in createCrew:', error);
        throw error; // Rethrow to be handled by higher-level handler
    }
};
