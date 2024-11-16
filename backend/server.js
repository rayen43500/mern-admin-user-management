//* ===================================================== Server Configuration =====================================================

// ===================== Importing necessary modules =====================
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();


// ===================== Importing necessary files =====================
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFoundErrorHandler, errorHandler } from './middlewares/errorMiddleware.js';


// Server port configuration
const PORT = process.env.PORT || 5000;

// Express app configuration
const app = express();

// ===================== Database Configuration =====================
import connectDB from './config/db.js';

connectDB();

// ===================== Setting Static Folder =====================
app.use(express.static('backend/Public'));


// ========================================== Middleware's ==========================================

app.use(cookieParser()); // CookieParser Middleware

app.use(express.json()); // Body parser Middleware from Express

app.use(express.urlencoded({ extended: true })); // Form Data parser Middleware from Express



//? ===================== Application Home Route =====================
app.get('/', (req, res)=> {
    
    res.status(200).json(`${process.env.APPLICATION_NAME} Server and Systems are Up & Running.`);

});


//? ===================== Routes Configuration =====================
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);



//? ===================== Error handler middleware configuration =====================
app.use(notFoundErrorHandler);
app.use(errorHandler);



//NOTE ===================== Starting Server =====================
app.listen(PORT, ()=> {

    console.log(`${process.env.APPLICATION_NAME} SERVER is LIVE & Listening on PORT ${PORT}.........`);

}); 
