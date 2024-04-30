import express from "express";
import { fetchAllblogs, fetchCustomBlog, LikeCustomBlog, deleteCustomBlog, CommentCustomBlog, fetchBySearch } from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", fetchAllblogs);
router.get("/search", fetchBySearch);
router.get("/:id", fetchCustomBlog);
router.patch("/like/:id", auth, LikeCustomBlog);
router.patch("/comment/:id", auth, CommentCustomBlog);
router.delete("/:id", deleteCustomBlog);

export default router;