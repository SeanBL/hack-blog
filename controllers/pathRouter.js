const { Router} = require('express');
const path = require('path');

const pathRouter = new Router;

pathRouter.get('/', (req, res) => {
    res.render('home');
});

pathRouter.get('/login', (req, res) => {
    res.render('login');
})

module.exports = pathRouter;