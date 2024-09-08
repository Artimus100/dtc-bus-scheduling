"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routeontroller_1 = require("./controllers/routeontroller");
const schedulingServices_1 = require("./services/schedulingServices");
const busController_1 = require("./controllers/busController");
const crewController_1 = require("./controllers/crewController");
const assignmentController_1 = require("./controllers/assignmentController");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.post('/api/routes', routeontroller_1.createRouteHandler);
app.get('/api/routes', routeontroller_1.listRoutes);
// app.get('/api/routes/overlaps', checkRouteOverlaps);
app.post('/api/schedule/linked', schedulingServices_1.linkedDutyScheduling);
app.post('/api/schedule/unlinked', schedulingServices_1.unlinkedDutyScheduling);
app.post('/api/buses', busController_1.createNewBus);
// app.post('/api/assignCrew', assignCrew);
app.post('/api/linkBus', busController_1.linkBus);
app.post('/api/crew', crewController_1.createNewCrew);
app.post('/api/assignments', assignmentController_1.createAssignment);
// Route for creating a new route
app.post('/routes', routeontroller_1.createRouteHandler);
// Route for finding routes intersecting with a given GeoJSON
app.post('/routes/intersect', routeontroller_1.findRoutesHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
