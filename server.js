require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');

const { engine } = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/connection');


const mainRouter = require("./controllers");
const { Sequelize } = require("sequelize");
const helpers = require('./utils/helpers');

const app = express();

const PORT = process.env.PORT || 3001;




app.engine('handlebars', engine( helpers ));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(mainRouter);
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log("Listening on http://localhost:" + PORT);
    });
});
