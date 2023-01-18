const { Router} = require('express');
const path = require('path');

const auth = require('../middleware/auth');
const Blog = require('../models/blog');

const pathRouter = new Router;

pathRouter.get('/', auth, async (req, res) => {
    const plainUser = req.user.get({ plain: true });

    // use later for homepage
    // const blogs = await Blog.findAll({
    //     where: {
    //         user_id: req.user.id,
    //     },
    // });

    // const plainBlogs = blogs.map((blog) => blog.get({ plain: true }));

    // console.log(blogs);

    res.render('home', {
        user: plainUser,
        isLoggedIn: !!req.user,
        // blogs: plainBlogs,
    });  
});

pathRouter.get('/login', (req, res) => {
    res.render('login');
})

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
    });  
})

module.exports = pathRouter;