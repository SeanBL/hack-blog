const { Router } = require("express");

const User = require('../../models/user');

const usersRouter = new Router();

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

    res.end();
})

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