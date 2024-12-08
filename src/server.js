const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendsRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();
const uploadDir = path.join(__dirname, "../upload");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


require("dotenv").config();
require("./db");
// import authMiddleware
const verifyToken = require('./middleware/authMiddleware');

// Middleware
app.use(cors());
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "../upload")));
app.use("/api/auth", authRoutes);
app.use("/api/friend", verifyToken,friendRoutes);
app.use("/api/post", verifyToken,postRoutes);

// Logging middleware
app.use((req, res, next) => {
  console.log("headers", req.headers);
  console.log("body", req.body);
  next();
});

// Routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
