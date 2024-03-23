import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import {getAuthor,editUser,changeAvatar,getUser,loginUser,registerUser} from './controllers/userController.js'
import { notFound, errorHandeler } from './middleware/errorMidelwar.js';
dotenv.config();

// Import route handlers
import postRoutes from './routes/postRoutes.js';
import  userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);



app.use(notFound);
app.use(errorHandeler);



// Connect to MongoDB and start the server
connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on  http://localhost:${process.env.PORT || 5000}`);
      console.log('Connected to MongoDB');
    });
  })
  .catch(error => {
    console.error("Failed to connect to MongoDB:", error);
  });
