// src/services/busService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new bus
export const createBus = async (number: string, routeId?: string) => {
    try {
        // Optional: Check if routeId exists
        if (routeId) {
            const route = await prisma.route.findUnique({
                where: { id: routeId },
            });
            if (!route) {
                throw new Error('Route not found');
            }
        }

        return await prisma.bus.create({
            data: { number, routeId },
        });
    } catch (error) {
        console.error('Error in createBus:', error);
        throw error; // Re-throw the error to be caught by the controller
    }
};

// Assign crew to a bus
// export const assignCrewToBus = async (crewId: string, busId: string) => {
//     try {
//         // Verify if the crew and bus exist
//         const crew = await prisma.crew.findUnique({ where: { id: crewId } });
//         const bus = await prisma.bus.findUnique({ where: { id: busId } });

//         if (!crew) {
//             throw new Error(`Crew with ID ${crewId} not found`);
//         }
//         if (!bus) {
//             throw new Error(`Bus with ID ${busId} not found`);
//         }

//         // Update the crew with the assigned bus
//         return await prisma.crew.update({
//             where: { id: crewId },
//             data: { busId },
//         });
//     } catch (error) {
//         console.error('Error in assignCrewToBus:', error);
//         throw new Error('Error assigning crew to bus');
//     }
// };
// Link a bus to a route
export const linkBusToRoute = async (busId: string, routeId: string) => {
    return await prisma.bus.update({
        where: { id: busId },
        data: { routeId },
    });
};
