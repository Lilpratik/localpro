const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware 
app.use(cors());
app.use(express.json());


// Test route 
app.get('/', (req, res) => {
    res.json({
        message: "LocalPro API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`LocalPro server running on port ${PORT}`);
});

