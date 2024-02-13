const express = require('express');
const router = express.Router();

// GET endpoint
router.get('/api/data', (req, res) => {
  // Assuming some data to send back
  const data = {
    message: 'GET request successful!',
    timestamp: new Date()
  };
  res.json(data);
});

// POST endpoint
router.post('/api/data', (req, res) => {
  // Assuming some data is received in the request body
  const receivedData = req.body;
  console.log('Received data:', receivedData);

  // Assuming some processing is done with the received data
  // For example, saving it to a database

  // Sending back a response
  const response = {
    message: 'POST request successful!',
    receivedData: receivedData,
    timestamp: new Date()
  };
  res.json(response);
});

module.exports = router;
