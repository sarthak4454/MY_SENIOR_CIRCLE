import mongoose from "mongoose";
const commentSchema =
    mongoose.Schema({
        username: { type: String },
        data: { type: String }
    });
const BlogSchema =
    mongoose.Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        posted: { type: String, required: true },
        user: { type: String, required: true },
        blogphoto: { type: String },
        like: { type: [String], default: [] },
        comments: {
            type: [commentSchema],
            default: []
        }
    });

const userSchema =
    mongoose.Schema({
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        emailid: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        photo: { type: String },
        collegeName: { type: String },
        Experience: { type: String },
    });
const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Post", BlogSchema);
export { User, Blog };