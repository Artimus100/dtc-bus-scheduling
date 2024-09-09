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
exports.createCrew = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCrew = (driverName, conductorName, busId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure driverName and conductorName are not undefined or empty
        if (!driverName || !conductorName) {
            throw new Error("Driver name and conductor name must be provided");
        }
        // Upsert the driver
        const driver = yield prisma.driver.upsert({
            where: { name: driverName },
            update: {}, // No updates needed
            create: { name: driverName }, // Create if not found
        });
        // Upsert the conductor
        const conductor = yield prisma.conductor.upsert({
            where: { name: conductorName },
            update: {}, // No updates needed
            create: { name: conductorName }, // Create if not found
        });
        // Create the crew and optionally link to a bus
        const newCrew = yield prisma.crew.create({
            data: {
                driverId: driver.id,
                conductorId: conductor.id,
                busId: busId || undefined, // Optional linking to bus
            },
        });
        return newCrew;
    }
    catch (error) {
        console.error('Error in createCrew:', error);
        throw error; // Rethrow to be handled by higher-level handler
    }
});
exports.createCrew = createCrew;
