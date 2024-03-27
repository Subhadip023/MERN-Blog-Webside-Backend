import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import {getAuthor,editUser,changeAvatar,getUser,loginUser,registerUser} from './controllers/userController.js'
import { notFound, errorHandeler } from './middleware/errorMidelwar.js';
import upload from "express-fileupload"
import { fileURLToPath } from 'url';
import { dirname } from 'path';


dotenv.config();

// Import route handlers
import postRoutes from './routes/postRoutes.js';
import  userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ credentials: true, origin: "https://mern-blog-webside.onrender.com" }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));// Change it for test in local directory 

app.use(upload());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(__dirname + "/uploads"));

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
