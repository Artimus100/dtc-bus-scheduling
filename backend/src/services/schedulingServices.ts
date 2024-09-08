import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const linkedDutyScheduling = async () => {
    const crews = await prisma.crew.findMany();
    const buses = await prisma.bus.findMany();
    const routes = await prisma.route.findMany();  // Fetch available routes
    
    const assignments: { crewId: string; busId: string; routeId: string; startTime: Date; endTime: Date; }[] = [];

    for (let crew of crews) {
        const bus = buses.find(bus => !assignments.some(assign => assign.busId === bus.id));
        const route = routes.find(route => !assignments.some(assign => assign.routeId === route.id));

        if (bus && route) {
            assignments.push({
                crewId: crew.id,
                busId: bus.id,
                routeId: route.id,   // Assign the route ID
                startTime: new Date(),
                endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // Example 8-hour shift
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
    const routes = await prisma.route.findMany();  // Fetch available routes

    const queue = [...crews];  // Queue-based system for rotating crews
    const assignments: { crewId: string; busId: string; routeId: string; startTime: Date; endTime: Date; }[] = [];

    for (let bus of buses) {
        if (queue.length > 0) {
            const crew = queue.shift();
            const route = routes[Math.floor(Math.random() * routes.length)];  // Randomly assign a route to the bus

            if (crew && route) {
                assignments.push({
                    crewId: crew.id,
                    busId: bus.id,
                    routeId: route.id,  // Assign the route ID
                    startTime: new Date(),
                    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // Example shorter 2-hour trip
                });

                // Rotate the crew back into the queue after their rest period
                setTimeout(() => {
                    queue.push(crew);
                }, 30 * 60 * 1000);  // Example 30-minute rest period
            }
        }
    }

    // Save assignments to the database
    for (let assignment of assignments) {
        await prisma.assignment.create({ data: assignment });
    }

    return assignments;
};