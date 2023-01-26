const { Router } = require('express');
const Blog = require('../../models/blog');
const auth = require('../../middleware/auth');
const { sync } = require('../../models/blog');
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

blogRouter.put('/:id', auth, async (req, res) => {
    const { body, title } = req.body;

    const blog = await Blog.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!blog) {
        res.status(404).end("Cannot find that blog.");
        return;
    }

    await blog.update({
        title,
        body,
    })

    res.end();
    console.log("updated");
})

blogRouter.delete('/:id', auth, async (req, res) => {
    const blog = await Blog.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!blog) {
        res.status(404).end("Cannot find that blog.");
        return;
    }
    
    await blog.destroy({
        where: {
            id: req.params.id,
        },
    })

    res.end();
})

module.exports = blogRouter;