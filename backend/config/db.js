const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => console.log(`🚀 MongoDB Connected: ${conn.connection.host}`))
    .catch((err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
      process.exit(1); // Exit process on failure
    });
};

module.exports = connectDB;

