const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Client aur server ko connect karne ke liye
app.use(express.json()); // JSON data handle karne ke liye

app.post('/apply', (req, res) => {
  const { jobTitle, location, resume } = req.body;
  console.log('Job Title:', jobTitle);
  console.log('Location:', location);
  // Resume handling baad mein add karenge

  res.send({ message: 'Job data received!' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
