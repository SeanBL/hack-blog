const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require('../../models/user');

const usersRouter = new Router();

usersRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: {
            username,
        },
    });

    if (user) {
        res.status(409).end("User with username already exists");
        return;
    }

    const newUser = await User.create({
        username,
        password,
    });

    res.status(200).json({
        id: newUser.id,
    });
})


//For login
usersRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username, }});

    if (!user) {
        res.status(401).end('User not found');
        return;
    }

    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
        res.status(401).end("Bad password");
        return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1d' });

    res.cookie('logintoken', token/*, { maxAge: 900000, httpOnly: true }*/);

    res.end();
});

//For signup
usersRouter.post("/signup", async (req, res) => {
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