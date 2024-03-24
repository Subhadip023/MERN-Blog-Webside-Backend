import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  getCatPost,
  getUserPost,
  editPost,
  deletePost,
} from "../controllers/postControllers.js";

import authMiddleware from "../middleware/authMiddleWIre.js";







const router = Router();

    router.get("/",getPosts);

    router.get("/:id",getPost);

    router.get("/categorys/:category",getCatPost);

    router.get("/users/:id",getUserPost);
 
    router.post("/",authMiddleware,createPost);

    router.patch("/:id",authMiddleware,editPost);

   
    router.delete("/:id",authMiddleware,deletePost);

export default router;