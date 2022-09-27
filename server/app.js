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

// Specific wish by ID
app.get("/wishes/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (!id && id !==0) {
            throw "Invalid input!";
        } else if (id < 0 || id >= wishes.length) {
            throw "No such beast!";
        }

        const filtered = wishes.filter(w => w.id == req.params.id);
        res.send(filtered[0]);
    } catch(e) {
        res.status(404).send({error: e});
    }
});

// Post a new wish to the app
app.post("/wishes", (req, res) => {
    // Get the wish body data
    const newWish = req.body;
    // Add it to the list of current wishes
    newWish["id"] = wishes.length;
    wishes.push(newWish);

    // Return a message saying it worked
    res.status(201).send("You worked, here is your new wish" + newWish);
});

module.exports = app;