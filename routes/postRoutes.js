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

const router = Router();

    router.get("/",getPosts);

    router.get("/:id",getPost);

    router.post("/",createPost);

    router.patch("/:id",editPost);

    router.get("/categorys/:category",getCatPost);

    router.get("/users/:id",getUserPost);
    
    router.delete("/:id",deletePost);

export default router;