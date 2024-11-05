import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import speedLimiter from './middlaware/speedLimite.js';
import apiRoutes from './routes/api.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

/***
 * This Express application sets up a server with security, CORS, and rate limiting middleware.
 * It also serves static files and defines API routes.
 * 
 * Key functionalities:
 * - Use Helmet for securing HTTP headers.
 * - Enable CORS for cross-origin requests.
 * - Set up rate limiting to prevent abuse.
 * - Serve static files from the uploads directory.
 * - Define API routes for handling requests.
 */

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security middleware to set various HTTP headers for security
app.use(helmet());

// Enable CORS for all routes
app.use(cors());

// Configure trust proxy (useful if behind a reverse proxy)
app.set('trust proxy', 1);

// Rate limiting middleware to limit repeated requests to public APIs and/or endpoints
app.use(speedLimiter);

// Define API routes
app.use('/api', apiRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
