import express from 'express';
import cors from 'cors';
import { createNewRoute, listRoutes, checkRouteOverlaps } from './controllers/routeontroller';
import { linkedDutyScheduling, unlinkedDutyScheduling } from './services/schedulingServices';
import { createNewBus, linkBus } from './controllers/busController';
import { createNewCrew } from './controllers/crewController';
import { createAssignment } from './controllers/assignmentController';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/routes', createNewRoute);
app.get('/api/routes', listRoutes);
app.get('/api/routes/overlaps', checkRouteOverlaps);

app.post('/api/schedule/linked', linkedDutyScheduling);
app.post('/api/schedule/unlinked', unlinkedDutyScheduling);

app.post('/api/buses', createNewBus);
// app.post('/api/assignCrew', assignCrew);
app.post('/api/linkBus', linkBus);
app.post('/api/crew', createNewCrew);
app.post('/api/assignments', createAssignment);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
