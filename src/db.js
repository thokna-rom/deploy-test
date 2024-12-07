const mongoose = require("mongoose");
require("dotenv").config(); // Fix: Add the parentheses to call the function

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(() => {
        console.log("Failed to connect to MongoDB", err);
    });
