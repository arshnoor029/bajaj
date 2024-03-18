// index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Route for POST /bfhl
app.post('/bfhl', (req, res) => {
  try {
    // Extract data array from request body
    const { data } = req.body;

    // Check if data array exists
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid data format" });
    }

    // Filter odd and even numbers, and alphabets
    const oddNumbers = data.filter(item => typeof item === 'string' && parseInt(item) % 2 !== 0);
    const evenNumbers = data.filter(item => typeof item === 'string' && parseInt(item) % 2 === 0);
    const alphabets = data.filter(item => typeof item === 'string' && /^[a-zA-Z]$/.test(item)).map(item => item.toUpperCase());

    // Prepare response object
    const response = {
      is_success: true,
      user_id: "arshnoor_17091999",
      email: "arshnoor@gmail.com",
      roll_number: "ABCD123",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets
    };

    // Send response
    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ is_success: false, error: "Internal Server Error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
