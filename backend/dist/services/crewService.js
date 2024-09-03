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
// src/services/crewService.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCrew = (name, busId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Optional: Validate if busId exists
        if (busId) {
            const bus = yield prisma.bus.findUnique({
                where: { id: busId },
            });
            if (!bus) {
                throw new Error('Bus not found');
            }
        }
        return yield prisma.crew.create({
            data: { name, busId },
        });
    }
    catch (error) {
        console.error('Error in createCrew:', error);
        throw error; // Re-throw the error to be caught by the controller
    }
});
exports.createCrew = createCrew;
