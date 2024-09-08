"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkedDutyScheduling = exports.linkedDutyScheduling = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const linkedDutyScheduling = () => __awaiter(void 0, void 0, void 0, function* () {
    const crews = yield prisma.crew.findMany();
    const buses = yield prisma.bus.findMany();
    const routes = yield prisma.route.findMany(); // Fetch available routes
    const assignments = [];
    for (let crew of crews) {
        const bus = buses.find(bus => !assignments.some(assign => assign.busId === bus.id));
        const route = routes.find(route => !assignments.some(assign => assign.routeId === route.id));
        if (bus && route) {
            assignments.push({
                crewId: crew.id,
                busId: bus.id,
                routeId: route.id, // Assign the route ID
                startTime: new Date(),
                endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // Example 8-hour shift
            });
        }
    }
    // Save assignments to the database
    for (let assignment of assignments) {
        yield prisma.assignment.create({ data: assignment });
    }
    return assignments;
});
exports.linkedDutyScheduling = linkedDutyScheduling;
const unlinkedDutyScheduling = () => __awaiter(void 0, void 0, void 0, function* () {
    const crews = yield prisma.crew.findMany();
    const buses = yield prisma.bus.findMany();
    const routes = yield prisma.route.findMany(); // Fetch available routes
    const queue = [...crews]; // Queue-based system for rotating crews
    const assignments = [];
    for (let bus of buses) {
        if (queue.length > 0) {
            const crew = queue.shift();
            const route = routes[Math.floor(Math.random() * routes.length)]; // Randomly assign a route to the bus
            if (crew && route) {
                assignments.push({
                    crewId: crew.id,
                    busId: bus.id,
                    routeId: route.id, // Assign the route ID
                    startTime: new Date(),
                    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // Example shorter 2-hour trip
                });
                // Rotate the crew back into the queue after their rest period
                setTimeout(() => {
                    queue.push(crew);
                }, 30 * 60 * 1000); // Example 30-minute rest period
            }
        }
    }
    // Save assignments to the database
    for (let assignment of assignments) {
        yield prisma.assignment.create({ data: assignment });
    }
    return assignments;
});
exports.unlinkedDutyScheduling = unlinkedDutyScheduling;
