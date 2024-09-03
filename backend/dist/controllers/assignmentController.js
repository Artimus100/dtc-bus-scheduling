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
exports.createAssignment = void 0;
const assignmentService_1 = require("../services/assignmentService");
const createAssignment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { crewId, busId, startTime, endTime } = req.body;
        const assignment = yield (0, assignmentService_1.assignCrewToBus)(crewId, busId, new Date(startTime), new Date(endTime));
        res.status(201).json(assignment);
    }
    catch (error) {
        console.error('Error in createAssignment:', error);
        res.status(500).json({ error: 'Error assigning crew to bus' });
    }
});
exports.createAssignment = createAssignment;
