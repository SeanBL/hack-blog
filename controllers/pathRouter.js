const { Router} = require('express');
const path = require('path');

const auth = require('../middleware/auth');
const { Blog, User, Comment } = require('../models');

const pathRouter = new Router;


pathRouter.get('/', async (req, res) => {
    //const plainBlogs = req.params;

    const blogs = await Blog.findAll({
        attributes: ["id", "title", "body", "date"],
        include: [{
            model: User,
            attributes: ["username"],
        },
        {
            model: Comment,
            attributes: ['id', 'body', 'date', 'user_id', 'blog_id'],
            include: [{
                model: User,
                attributes: ['username']
            }]
        }
        ],
    });

    const plainBlogs = blogs.map((blog) => blog.get({ plain: true }));

    console.log(JSON.stringify(plainBlogs));
    

    res.render('homepage', {
        blogs: plainBlogs,
        style: 'homepage.css',
    });
    
});

pathRouter.get('/homepage', auth, async (req, res) => {
    //const plainBlogs = req.params;

    const blogs = await Blog.findAll({
        attributes: ["id", "title", "body", "date"],
        include: [{
            model: User,
            attributes: ["username"],
        },
        {
            model: Comment,
            attributes: ['id', 'body', 'date', 'user_id', 'blog_id'],
            include: [{
                model: User,
                attributes: ['username']
            }]
        }
        ],
    });

    const plainBlogs = blogs.map((blog) => blog.get({ plain: true }));

    console.log(JSON.stringify(plainBlogs));
    

    res.render('homepage', {
        blogs: plainBlogs,
        isLoggedIn: !!req.user,
        style: 'homepage.css'
    });
    
});


pathRouter.get('/login', (req, res) => {
    

    res.render('login', {
        style: 'login.css'
    });
});

pathRouter.get('/signup', (req, res) => {
    res.render('signup', {
        style: 'signup.css'
    });
});

pathRouter.get('/dashboard', auth, async (req, res) => {
    const plainUser = req.user.get({ plain: true });

    const blogs = await Blog.findAll({
        where: {
            user_id: req.user.id,
        },
    });

    const plainBlogs = blogs.map((blog) => blog.get({ plain: true }));

    console.log(blogs);

    res.render('dashboard', {
        user: plainUser,
        isLoggedIn: !!req.user,
        dashboard: true,
        blogs: plainBlogs,
        style: 'dashboard.css',
    });  
});

pathRouter.get('/createblog', auth, async (req, res) => {
    const plainUser = req.user.get({ plain: true });

    const blogs = await Blog.findAll({
        where: {
            user_id: req.user.id,
        },
    });

    res.render('createblog', {
        user: plainUser,
        isLoggedIn: !!req.user,
        dashboard: true,
        style: 'createblog.css'
    });  
})

pathRouter.get("/updateblog/:id", auth, async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);

    if (!blog) {
        res.status(404).end("Blog does not exist");
        return;
    }

    const simpleBlog = blog.get({ simple: true })

    res.render('updateblog', {
        blog: simpleBlog,
        isLoggedIn: !!req.user,
        style: 'updateblog.css',
    });
});

pathRouter.get("/comments/:id", auth, async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findOne({
        where: {
            id: req.params.id,
        },
        include: [{
            model: User,
            attributes: ["username"],
        }],
    });
    

    if (!blog) {
        res.status(404).end("Blog does not exist");
        return;
    }

    const simpleBlog = blog.get({ simple: true })
    simpleBlog.user = simpleBlog.user.get({ simple: true });
    console.log(simpleBlog);
    res.render('comments', {
        blog: simpleBlog,
        isLoggedIn: !!req.user,
        style: 'comment.css'
    });
})

module.exports = pathRouter;