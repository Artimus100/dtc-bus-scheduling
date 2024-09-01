"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routecontroller_1 = require("./controllers/routecontroller");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get('/api/routes', routecontroller_1.getAllRoutes);
app.post('/api/routes', routecontroller_1.addRoute);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
