const express = require('express');
const { getAllPosts, createPost } = require('../controllers/post.controller');
const { verifyToken } = require('../middleware/verifyToken');

const postRouter = express.Router();


postRouter.get('/getAllPosts', getAllPosts);
// postRouter.get('/post:id');
postRouter.post('/createpost', verifyToken, createPost);
// postRouter.delete('/post');
// postRouter.put('/post');


module.exports = postRouter