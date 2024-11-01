const express = require("express");
const userRoutes = require('./routes/users');
require("dotenv").config();

const app = express();

app.use(express.json());

const port = parseInt(process.env.EXPRESS_PORT ?? "5000", 10);

const routes = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const welcome = (req, res) => {
    res.send("Welcome to food server");
};

const api = (req, res) => {
    res.send("Welcome to food server APIs");
};

app.get("/", welcome);
app.get("/api", api);
app.use('/api/users', userRoutes);


app.listen(port, (err) => {
    if (err) {
        console.error("Something bad happened");
    } else {
        console.log(`Server is listening on ${port}`);
    }
});
