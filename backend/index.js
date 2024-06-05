import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routers/tour.js';
import userRoute from './routers/users.js';
import authRoute from './routers/auth.js';
import reviewRoute from './routers/reviews.js';
import bookingRoute from './routers/booking.js';
import paymentRoute from './routers/payment.js';
import path from 'path';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true
};

// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    } catch (err) {
        console.log('Database connection error:', err.message);
    }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Serve static files from the 'backend/uploads' directory
app.use(express.static('uploads/'))

// Routes
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/payment', paymentRoute);

// Start the server
app.listen(port, () => {
    connect();
    console.log('Server is listening on port', port);
});

