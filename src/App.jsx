import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [resume, setResume] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Form data handle karne ke liye
    if (!jobTitle || !location || !resume) {
      alert("Please fill all fields!");
      return;
    } // Form validation
    try {
      const formData = new FormData();
      formData.append("jobTitle", jobTitle);
      formData.append("location", location);
      formData.append("resume", resume);

      const response = await axios.post(
        "http://localhost:5000/apply",
        formData
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error applying for the job:", error);
    }
  };

  return (
    <div>
      <h1>Auto-Apply Job Application</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Resume:</label>
          <input type="file" onChange={(e) => setResume(e.target.files[0])} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
