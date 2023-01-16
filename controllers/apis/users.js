const { Router } = require("express");
const jwt = require("jsonwebtoken");

const User = require('../../models/user');

const usersRouter = new Router();

//For login
usersRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username, }});

    if (!user) {
        res.status(401).end('User not found');
        return;
    }

    if (user.password != password) {
        res.status(401).end("Bad password");
        return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);

    res.cookie('logintoken', token, { maxAge: 900000, httpOnly: true });

    res.end();
})

//For signup
usersRouter.post("/", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username, }});

    if (user) {
        res.status(409).end('User already exists');
        return;
    }

    const newUserObject = await User.create({
        username,
        password,
    });

    res.status(200).json({
        id: newUserObject.id,
    });
});

module.exports = usersRouter;