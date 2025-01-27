const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { applyJob } = require('./automation'); // Puppeteer automation import

const upload = multer(); // for handling form-data

const app = express();

// Middlewares
app.use(cors()); // Client aur server ko connect karne ke liye
app.use(express.json()); // JSON data handle karne ke liye
app.use(express.urlencoded({ extended : true })); // this line to handle form submission

app.post('/apply', upload.single('resume'), async(req, res) => {
  // Resume handling baad mein add karenge
  try {
    const { jobTitle, location } = req.body;
    console.log('Job Title:', jobTitle || 'Not received');
    console.log('Location:', location || 'Not received');
    console.log('Resume:', req.file ? req.file.originalname : 'No file uploaded');
    if (!jobTitle || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    console.log('Incoming Request:', req.body); // Request body check
    console.log('File Received:', req.file); // File check
    console.log('Received:', { jobTitle, location });

    await applyJob(jobTitle, location);
    // res.send({ message: 'Job data received!' });
    console.log('Automation Started!');
    res.send({ message: 'Automation started!' });
  } catch (error) {
    console.error('Error Occurred:', error); // Error ko console pe print karo
    res.status(500).send({ error: 'Server error', details: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
