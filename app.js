const express = require("express");

const app = express();
const port = 5000;

const routes = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const welcome = (req, res) => {
    res.send("Welcome to server");
};

app.get("/", welcome);

app.listen(port, (err) => {
    if (err) {
        console.error("Something bad happened");
    } else {
        console.log(`Server is listening on ${port}`);
    }
});
