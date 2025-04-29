// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from 'dotenv';

// Import routes 

// Initialize express app
const app = express();

// Load environment variables
env.config();

// Middleware
app.use(cors()); // <-- Allow frontend to connect to backend
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //  for POST requests
app.use(express.static('public'));

// Health check route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Use routes (to be added later)

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});