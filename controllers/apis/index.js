const { Router } = require("express");

const usersRouter = require('./users');
const blogRouter = require('./blogpost');

const apiRouter = new Router();

apiRouter.use('/user', usersRouter);
apiRouter.use('/blogpost', blogRouter);

module.exports = apiRouter;