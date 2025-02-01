const express = require("express");
const connectDB = require("./database/db");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const allocationRoutes = require("./routes/allocationRoutes");
const astrologerRoutes = require("./routes/astrologerRoutes");
const authRoutes = require("./routes/authRoutes");
const getAstrologers = require('./routes/astrologers');

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// Routes
app.use("/api", allocationRoutes);

app.use("/api/auth", authRoutes);
app.use("/api", getAstrologers);
// app.use("/api/astrologers", astrologerRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
