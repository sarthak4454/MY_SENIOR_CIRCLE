import { Blog } from "../model/user.js";
import mongoose from 'mongoose';

export const addBlog = async (req, res) => {

    const newBlog = req.body;
    try {
        await Blog.create(newBlog);
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const fetchAllblogs = async (req, res) => {
    try {
        const allBlogs =
            await Blog.find();
        res.status(200).json(allBlogs);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const fetchCustomBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const MyBlog =
            await Blog.findById(id);
        res.status(200).json(MyBlog);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const deleteCustomBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await Blog.findByIdAndRemove(id);
        res.json({
            message:
                "Post deleted successfully."
        });
    } catch (error) {
        res.status(404).json(
            { message: error.message });
    }
}

export const LikeCustomBlog = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const blog = await Blog.findById(id);
    const index = blog.like.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        blog.like.push(req.userId);
    } else {
        blog.like = blog.like.filter((id) => id !== String(req.userId));
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    res.status(200).json(updatedBlog);
}
export const CommentCustomBlog = async (req, res) => {
    const { username, data } = req.body;
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const blog =
        await Blog.findById(id);
    blog.comments.push({ username, data });
    const updatedBlog =
        await Blog.findByIdAndUpdate(
            id, blog, { new: true });
    res.status(200).json(updatedBlog);
}
export const fetchBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const blogs = await Blog.find({ title });
        res.json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}   