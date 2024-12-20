const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoute")
const courseRoutes = require("./routes/courseRoutes")
const cookie = require("cookie-parser")

const connectDB = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB()
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie())



// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/course", courseRoutes)




app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
