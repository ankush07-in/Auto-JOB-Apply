const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer(); // for handling form-data

const app = express();

app.use(cors()); // Client aur server ko connect karne ke liye
app.use(express.json()); // JSON data handle karne ke liye
app.use(express.urlencoded({ extended : true })); // this line to handle form submission

app.post('/apply', upload.single('resume'), (req, res) => {
  const { jobTitle, location } = req.body;
  console.log('Job Title:', jobTitle || 'Not received');
  console.log('Location:', location || 'Not received');
  console.log('Resume:', req.file ? req.file.originalname : 'No file uploaded');
  // Resume handling baad mein add karenge
  try {
    const { jobTitle, location } = req.body;
    if (!jobTitle || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    console.log('Received:', { jobTitle, location });
    res.send({ message: 'Job data received!' });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
