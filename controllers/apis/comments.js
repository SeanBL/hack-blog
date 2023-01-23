const { Router } = require('express');
const { Blog, Comment, User } = require('../../models');
const auth = require('../../middleware/auth');
const commentRouter = new Router();

commentRouter.post("/", auth, async (req, res) => {
    const { body, date } = req.body;

    const comment = await Comment.create({
        body,
        date,
        user_id: req.user.id,
        blog_id: req.body.blog_id,
    });

    res.json({
        comment,
    })
});

module.exports = commentRouter;