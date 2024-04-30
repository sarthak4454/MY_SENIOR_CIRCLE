import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRoutes from "./Routes/post.js";
import userRoutes from "./Routes/user.js";
import authRoutes from "./Routes/auth.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000; // Adjusted the order here
const CONNECTION_URL = "mongodb+srv://garg49975:sarthak123@cluster.47pzwrm.mongodb.net/?retryWrites=true&w=majority";

// Set strictQuery to false to suppress the deprecation warning
mongoose.set('strictQuery', false);

app.use("/", authRoutes);
app.use("/blogs", postRoutes);
app.use("/users/profile", userRoutes);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log("Server running at port: " + PORT)))
    .catch((error) => console.log(error.message));
