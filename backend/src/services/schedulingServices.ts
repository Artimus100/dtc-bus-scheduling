import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const linkedDutyScheduling = async () => {
    const crews = await prisma.crew.findMany();
    const buses = await prisma.bus.findMany();
    
    // Example greedy algorithm implementation
    const assignments: { crewId: string; busId: string; startTime: Date; endTime: Date; }[] = [];

    for (let crew of crews) {
        const bus = buses.find(bus => !assignments.some(assign => assign.busId === bus.id));

        if (bus) {
            assignments.push({
                crewId: crew.id,  // Use string ID
                busId: bus.id,    // Use string ID
                startTime: new Date(),
                endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // Example shift duration
            });
        }
    }

    // Save assignments to the database
    for (let assignment of assignments) {
        await prisma.assignment.create({ data: assignment });
    }

    return assignments;
};

export const unlinkedDutyScheduling = async () => {
    const crews = await prisma.crew.findMany();
    const buses = await prisma.bus.findMany();
    
    // Queue-based system for rotations
    const queue = [...crews];
    const assignments: { crewId: string; busId: string; startTime: Date; endTime: Date; }[] = [];

    for (let bus of buses) {
        if (queue.length > 0) {
            const crew = queue.shift();

            if (crew) {
                assignments.push({
                    crewId: crew.id,  // Use string ID
                    busId: bus.id,    // Use string ID
                    startTime: new Date(),
                    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // Example shorter trip duration
                });

                // Rotate the crew back into the queue after a rest period
                setTimeout(() => {
                    queue.push(crew);
                }, 30 * 60 * 1000); // Example rest period
            }
        }
    }

    // Save assignments to the database
    for (let assignment of assignments) {
        await prisma.assignment.create({ data: assignment });
    }

    return assignments;
};
