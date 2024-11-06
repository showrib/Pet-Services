const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // User-related routes
const adoptionRoutes = require('./routes/adoptionRoutes'); // Adoption forms routes
const bookingRoutes = require('./routes/bookingRoutes'); // Booking routes
const feedbackRoutes = require('./routes/FeedbackRoutes'); // Feedback routes (ensure naming consistency)
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Specify your frontend URL
    methods: ['GET', 'POST'], // Specify the HTTP methods allowed
    credentials: true // Include credentials if necessary
}));

app.use(bodyParser.json());

// Connect to MongoDB
const dbURI = 'mongodb://localhost:27017/yourDB'; // Replace 'yourDB' with your database name
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/adoption', adoptionRoutes); // Routes for adoption forms
app.use('/api/bookings', bookingRoutes); // Routes for bookings
app.use('/api/feedback', feedbackRoutes); // Feedback routes

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
