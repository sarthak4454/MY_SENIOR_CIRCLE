import express from "express";
import { addBlog } from "../controllers/post.js";
const router = express.Router();
router.post('/addblog', addBlog);
export default router;