const { Router} = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const User = require('../models/user')

const pathRouter = new Router;

pathRouter.get('/', async (req, res) => {
    const { logintoken } = req.cookies;
    console.log(req.cookies);
    // if (!req.cookies) {
    //     res.redirect('/login');
    //     return;
    // }
    try {
        const data = jwt.verify(logintoken, process.env.JWT_KEY);
        const { id } = data;
        console.log(data);

        const user = await User.findByPk(id);
        const plainUser = user.get({ plain: true })

        res.render('home', {
            user: plainUser,
        });
    } catch (error) {
        if (error.message === "invalid token" || error.message === "jwt must be provided") {
            res.redirect('/login');
        } else {
            console.log(error);
            res.status(500).end("Something went wrong");
        }
    }
    

    
});

pathRouter.get('/login', (req, res) => {
    res.render('login');
})

module.exports = pathRouter;