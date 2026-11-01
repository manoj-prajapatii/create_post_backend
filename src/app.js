require('dotenv').config();
const express =require('express');
const multer = require('multer')
const uploadFile= require("./service/storage.service")
const postModel = require("./models/post.model")

const app = express();
app.use(express.json());

const upload = multer({storage:multer.memoryStorage()});

app.post('/create-post', upload.single("image"), async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const result = await uploadFile(req.file.buffer);
        console.log("Image Uploaded:", result.url);

        const post = await postModel.create({
            image: result.url,
            caption: req.body.caption
        });

        console.log("Post Saved:", post);

        return res.status(201).json({
            message: "Post Created Successfully!",
            post
        });

    } catch (error) {
        console.log("Error:", error);

        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

app.get('/posts', async (req, res) => {
    try {
        console.log("GET /posts route hit");

        const posts = await postModel.find();

        console.log("Posts fetched:", posts.length);

        return res.status(200).json({
            message: "Posts fetched successfully!",
            posts
        });

    } catch (error) {
        console.log("Fetch Error:", error);

        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});
module.exports = app;