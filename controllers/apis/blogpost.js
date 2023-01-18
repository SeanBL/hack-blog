const { Router } = require('express');
const Blog = require('../../models/blog');
const auth = require('../../middleware/auth');
const blogRouter = new Router();

blogRouter.post('/', auth, async (req, res) => {
    const { title, body, date } = req.body;

    const blog = await Blog.create({
        title,
        body,
        date,
        user_id: req.user.id,
    });

    res.json({
        id: blog.id,
        
    })
});

module.exports = blogRouter;