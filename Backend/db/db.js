const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("✅ Connected to DB");
    })
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
    });
}

module.exports = connectToDb;
