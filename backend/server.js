const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect Database
const connectDB = require("./config/db");
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Prep-Intel Backend Running");
});

// API Routes
app.use("/api/topics", require("./routes/topicRoutes"));
app.use("/api/pyqs", require("./routes/pyqRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});