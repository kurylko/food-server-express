const express = require("express");

const app = express();

require("dotenv").config();

const port = parseInt(process.env.EXPRESS_PORT ?? "5000", 10);

const routes = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const welcome = (req, res) => {
    res.send("Welcome to food server");
};

app.get("/", welcome);
app.get("/api", welcome);

app.listen(port, (err) => {
    if (err) {
        console.error("Something bad happened");
    } else {
        console.log(`Server is listening on ${port}`);
    }
});
