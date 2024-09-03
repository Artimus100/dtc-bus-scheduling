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
exports.createNewCrew = void 0;
const crewService_1 = require("../services/crewService");
const createNewCrew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, busId } = req.body;
        const crew = yield (0, crewService_1.createCrew)(name, busId);
        res.status(201).json(crew);
    }
    catch (error) {
        console.error('Error in createNewCrew:', error);
        res.status(500).json({ error: 'Error creating new crew member' });
    }
});
exports.createNewCrew = createNewCrew;
