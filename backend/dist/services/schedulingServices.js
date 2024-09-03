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
    // Example greedy algorithm implementation
    const assignments = [];
    for (let crew of crews) {
        const bus = buses.find(bus => !assignments.some(assign => assign.busId === bus.id));
        if (bus) {
            assignments.push({
                crewId: crew.id, // Use string ID
                busId: bus.id, // Use string ID
                startTime: new Date(),
                endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // Example shift duration
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
    // Queue-based system for rotations
    const queue = [...crews];
    const assignments = [];
    for (let bus of buses) {
        if (queue.length > 0) {
            const crew = queue.shift();
            if (crew) {
                assignments.push({
                    crewId: crew.id, // Use string ID
                    busId: bus.id, // Use string ID
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
        yield prisma.assignment.create({ data: assignment });
    }
    return assignments;
});
exports.unlinkedDutyScheduling = unlinkedDutyScheduling;
