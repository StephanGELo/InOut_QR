// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import env from 'dotenv';

// Import routes

// Initialize express app
const app = express();

//load enviroment variables
env.config();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

//  Health check route
app.get('/', (req, res) =>{
  res.send('INOut QR is running ok');
});

// Use routes


// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});