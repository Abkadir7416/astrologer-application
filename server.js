const express = require("express");
const connectDB = require("./database/db");
const dotenv = require("dotenv");
const allocationRoutes = require("./routes/allocationRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api", allocationRoutes);

// Export `app` for testing, don't start listening here
module.exports = app;


// Only start the server if not in test mode
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }


// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
