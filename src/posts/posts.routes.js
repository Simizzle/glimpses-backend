const { Router } = require ('express')
const postsRouter = Router();
const { getPosts, createPost, getPost, updatePost, deletePost, likePost } = require ('./posts.controllers');

postsRouter.get('/posts', getPosts);
postsRouter.post('/posts', createPost);
postsRouter.get('/posts/:id', getPost);
postsRouter.patch('/posts/:id', updatePost);
postsRouter.delete('/posts/:id', deletePost);
postsRouter.patch('/posts/:id/likePost', likePost);

module.exports = postsRouter;