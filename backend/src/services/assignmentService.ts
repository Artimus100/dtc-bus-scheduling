import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const assignCrewToBus = async (crewId: string, busId: string, routeId: string, startTime: Date, endTime: Date) => {
    try {
        // Validate crew existence
        const crew = await prisma.crew.findUnique({
            where: { id: crewId },
            include: {
                driver: true,
                conductor: true
            }
        });
        if (!crew) {
            throw new Error('Crew not found');
        }

        // Ensure both driver and conductor are assigned
        if (!crew.driver || !crew.conductor) {
            throw new Error('Crew must have both a driver and a conductor assigned');
        }

        // Validate bus existence
        const bus = await prisma.bus.findUnique({
            where: { id: busId },
        });
        if (!bus) {
            throw new Error('Bus not found');
        }

        // Validate route existence
        const route = await prisma.route.findUnique({
            where: { id: routeId },
        });
        if (!route) {
            throw new Error('Route not found');
        }

        // Check if the crew has any active assignments (i.e., assignments that haven't ended yet)
        const activeCrewAssignment = await prisma.assignment.findFirst({
            where: {
                crewId: crewId,
                endTime: {
                    gt: new Date(), // Assignment still active
                },
            },
        });

        if (activeCrewAssignment) {
            throw new Error('Crew is already assigned to another bus');
        }

        // Check if the bus has any active assignments (i.e., assignments that haven't ended yet)
        const activeBusAssignment = await prisma.assignment.findFirst({
            where: {
                busId: busId,
                endTime: {
                    gt: new Date(), // Assignment still active
                },
            },
        });

        if (activeBusAssignment) {
            throw new Error('Bus is already assigned to another crew');
        }

        // Create the new assignment if both the crew and bus are available
        return await prisma.assignment.create({
            data: {
                crewId,
                busId,
                routeId,   // Assign the route
                startTime,
                endTime,
            },
        });
    } catch (error) {
        console.error('Error in assignCrewToBus:', error);
        throw error; // Re-throw the error to be caught by the controller
    }
};
