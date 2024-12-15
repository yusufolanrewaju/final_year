const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the frontend/consumer folder
app.use(express.static(path.join(__dirname, "../frontend/consumer")));

// Serve static files from the frontend/uploader folder (optional)
app.use("/uploader", express.static(path.join(__dirname, "../frontend/uploader")));

// Handle requests to the root "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/consumer", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
