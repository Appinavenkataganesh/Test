const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./Router/Register');
const mongoose = require('mongoose');
require('./config/passport'); 
const taskRoutes = require('./Router/Task');

// Define MongoDB URI directly
const MONGO_URI = 'mongodb://localhost:27017/test';

// Define and connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(passport.initialize());

// Routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Error handling middleware
app.use(errorHandler);

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
