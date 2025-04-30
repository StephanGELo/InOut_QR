import express from 'express';

const router = express.Router();

// Testing route
router.get('/test', (req, res) =>{
  res.send("Admin API is working");
});

export default router;