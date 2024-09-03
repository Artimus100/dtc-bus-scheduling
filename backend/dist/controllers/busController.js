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
exports.linkBus = exports.createNewBus = void 0;
const busService_1 = require("../services/busService");
const createNewBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { number, routeId } = req.body;
        const bus = yield (0, busService_1.createBus)(number, routeId);
        res.status(201).json(bus);
    }
    catch (error) {
        console.error('Error in createNewBus:', error);
        res.status(500).json({ error: 'Error creating new bus' });
    }
});
exports.createNewBus = createNewBus;
// export const assignCrew = async (req: Request, res: Response) => {
//     try {
//         const { crewId, busId } = req.body;
//         if (!crewId || !busId) {
//             return res.status(400).json({ error: 'Missing crewId or busId' });
//         }
//         const updatedCrew = await assignCrewToBus(crewId, busId);
//         res.status(200).json(updatedCrew);
//     } catch (error) {
//         console.error('Error in assignCrew controller:', error);
//         res.status(500).json({ error: (error as any).message });
//     }
// };
const linkBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busId, routeId } = req.body;
        const updatedBus = yield (0, busService_1.linkBusToRoute)(busId, routeId);
        res.status(200).json(updatedBus);
    }
    catch (error) {
        res.status(500).json({ error: 'Error linking bus to route' });
    }
});
exports.linkBus = linkBus;
