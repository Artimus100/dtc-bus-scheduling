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
exports.linkBusToRoute = exports.createBus = void 0;
// src/services/busService.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new bus
const createBus = (number, routeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Optional: Check if routeId exists
        if (routeId) {
            const route = yield prisma.route.findUnique({
                where: { id: routeId },
            });
            if (!route) {
                throw new Error('Route not found');
            }
        }
        return yield prisma.bus.create({
            data: { number, routeId },
        });
    }
    catch (error) {
        console.error('Error in createBus:', error);
        throw error; // Re-throw the error to be caught by the controller
    }
});
exports.createBus = createBus;
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
const linkBusToRoute = (busId, routeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.bus.update({
        where: { id: busId },
        data: { routeId },
    });
});
exports.linkBusToRoute = linkBusToRoute;
