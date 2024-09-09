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
exports.assignCrewToBus = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const assignCrewToBus = (crewId, busId, routeId, startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate crew existence
        const crew = yield prisma.crew.findUnique({
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
        const bus = yield prisma.bus.findUnique({
            where: { id: busId },
        });
        if (!bus) {
            throw new Error('Bus not found');
        }
        // Validate route existence
        const route = yield prisma.route.findUnique({
            where: { id: routeId },
        });
        if (!route) {
            throw new Error('Route not found');
        }
        // Check if the crew has any active assignments (i.e., assignments that haven't ended yet)
        const activeCrewAssignment = yield prisma.assignment.findFirst({
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
        const activeBusAssignment = yield prisma.assignment.findFirst({
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
        return yield prisma.assignment.create({
            data: {
                crewId,
                busId,
                routeId, // Assign the route
                startTime,
                endTime,
            },
        });
    }
    catch (error) {
        console.error('Error in assignCrewToBus:', error);
        throw error; // Re-throw the error to be caught by the controller
    }
});
exports.assignCrewToBus = assignCrewToBus;
