const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    let data = req.body.data;

    // Check if the input is a valid array
    if (!Array.isArray(data)) {
      throw new Error('Invalid input: data must be an array');
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
    const alphabets = data.filter(item => isNaN(item) && item.length === 1);

    // Filter lowercase alphabets and find the highest one
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.sort((a, b) => b.localeCompare(a))[0] || '';

    res.json({
      is_success: true,
      user_id: 'aishwarya_billa_25081999',  // Update to your full name and DOB
      email: 'aishwarya.billa21@vit.edu',   // Update to your email
      roll_number: '21BCE10288',             // Update to your roll number
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ is_success: false, error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ is_success: false, error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
