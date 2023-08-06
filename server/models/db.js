// models/db.js
const mongoose = require('mongoose');
const Urldb = process.env.MONGODB;
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(Urldb);
    console.log('MongoDB connected:', connection.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with failure status (non-zero code)
  }
};

module.exports = connectDB;
