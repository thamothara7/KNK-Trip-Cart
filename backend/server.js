require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/saishivatours')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.warn('⚠️ Database connection warning: MongoDB is not running locally. The server will start, but database-dependent features may fail.', err.message);
    });

// Start Server unconditionally
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
