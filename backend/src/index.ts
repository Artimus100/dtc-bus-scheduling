import express from 'express';
import cors from 'cors';
import { getAllRoutes, addRoute } from './controllers/routecontroller';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/routes', getAllRoutes);
app.post('/api/routes', addRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
