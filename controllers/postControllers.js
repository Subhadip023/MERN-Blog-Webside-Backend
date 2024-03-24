import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import HttpErrors from "../models/errorModel.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Craete Post cntroller
// POST /api/posts
// Protected
const createPost = async (req, res, next) => {
    try {
      let { title, category, description } = req.body;
      let thumbnail = req.files.thumbnail;
  
      // Check if all required fields are provided
      if (!title || !category || !description || !thumbnail) {
        return next(new HttpErrors("Fill in all fields.", 422));
      }
  
      console.log(thumbnail); // Log the thumbnail object
  
      // Generate a unique filename for the uploaded file
      let filename = thumbnail.name;
  
      let splittedFilename = filename.split(".");
      let newFilename =
        splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];
  
      // Move the uploaded file to the desired location
      thumbnail.mv(
        path.join(__dirname, "..", "uploads", newFilename),
        async (err) => {
          if (err) {
            return next(new HttpErrors(err));
          } else {
            // Create a new post with the uploaded file
            const newPost = await Post.create({
              title,
              category,
              description,
              thumbnail: newFilename,
              creator: req.user.id,
            });
            if (!newPost) {
              return next(new HttpErrors("Post Couldn't be created.", 422));
            }
            // Update user's post count
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser.posts + 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
  
            res.status(200).json(newPost);
          }
        }
      );
    } catch (error) {
      return next(new HttpErrors(error));
    }
  };
  

// get  Post cntroller
// GET /api/posts
// unprotected
const getPosts = async (req, res, next) => {
  res.json("get all post");
};

// get a single post
// GET /api/posts/:id
// uppprotected
const getPost = async (req, res, next) => {
  res.json("get single post");
};

// get post by category
// GET /api/posts/categorys/:category
// unprotected
const getCatPost = async (req, res, next) => {
  res.json("get post by category");
};

// getpost By auther
// GET /api/posts/users/:id
// unprotected
const getUserPost = async (req, res, next) => {
  res.json("get post by user");
};

//   Edit post
// PATCH /api/posts/:id
// protected
const editPost = async (req, res, next) => {
  res.json("edit post");
};
//   DELETE post
// DELETE /api/posts/:id
// protected
const deletePost = async (req, res, next) => {
  res.json("delete post");
};

export {
  createPost,
  getPosts,
  getPost,
  getCatPost,
  getUserPost,
  editPost,
  deletePost,
};
