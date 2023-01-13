const express = require("express");
const { engine } = require('express-handlebars');
const path = require('path');

const mainRouter = require("./controllers");

const app = express();

const PORT = process.env.PORT || 3001;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.json());

app.use(mainRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log("Listening on http://localhost:" + PORT);
});