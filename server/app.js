// External imports
const express = require("express");
const cors = require("cors");

// Interal imports
const wishes = require("./wishing-well");
const logRoute = require("./route-logger");

// Configuration
const app = express();
app.use(cors());
app.use(express.json());
app.use(logRoute);

// Routes
app.get("/", (req, res) => res.send("Welcome to the all-mighty wishing well"));

// All of the wishes
app.get("/wishes", (req, res) => res.send(wishes));

module.exports = app;