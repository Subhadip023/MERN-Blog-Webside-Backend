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
    let { title, category, description, thumbnail } = req.body;

    // Check if all required fields are provided
    if (!title || !category || !description || !thumbnail) {
      return next(new HttpErrors("Fill in all fields.", 422));
    }

    // Create a new post with the base64-encoded thumbnail data
    const newPost = await Post.create({
      title,
      category,
      description,
      thumbnail: thumbnail, // Save base64 image data as thumbnail
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
  } catch (error) {
    return next(new HttpErrors(error));
  }
};




// get  Post cntroller
// GET /api/posts
// unprotected
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpErrors(error));
  }
};

// get a single post
// GET /api/posts/:id
// uppprotected
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpErrors(error));
  }
};

// get post by category
// GET /api/posts/categorys/:category
// unprotected
const getCatPost = async (req, res, next) => {
  try {
    const { category } = req.params;
    const post = await Post.find({ category });
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpErrors(error));
  }
};

// getpost By auther
// GET /api/posts/users/:id
// unprotected
const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ creator: id }).sort({ updatedAt: -1 });
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpErrors(error));
  }
};

//   Edit post
// PATCH /api/posts/:id
// protected
const editPost = async (req, res, next) => {
  try {
    let updatePost;
    const postId = req.params.id;
    const { title, description, category,thumbnail } = req.body;
    // let thumbnail = req.files.thumbnail;
    if (!title || !description || !category) {
      return next(new HttpErrors("Fill all the fields", 422));
    }

    if (!thumbnail) {
      updatePost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description },
        { new: true }
      );
    } else{
      updatePost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description,thumbnail },
        { new: true });
    }

    if (!updatePost) {
      return next(new HttpErrors("Couldn't update post", 400));
    }

    res.status(200).json(updatePost);
  } catch (error) {
    return next(new HttpErrors("from backend",error));
  }
};
  


//   DELETE post
// DELETE /api/posts/:id
// protected
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpErrors("Post ID not provided", 400)); // Correct error format
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpErrors("Post not found", 404)); // Return 404 if the post does not exist
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    // Update user's post count
    const currentUser = await User.findById(req.user.id);
    if (currentUser) { // Check if currentUser is not null or undefined
      const userPostCount = currentUser.posts - 1;
      await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
    }

    // Return success response
    res.status(200).json({ message: `Post ${postId} deleted successfully`, postId: postId });
  } catch (error) {
    // Pass error to error handling middleware
    return next(new HttpErrors(error));
  }
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
