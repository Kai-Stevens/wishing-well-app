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
    newWish["grant"] = 0;
    newWish["deny"] = 0;
    wishes.push(newWish);

    // Return a message saying it worked
    res.status(201).send("You worked, here is your new wish" + newWish);
});

// Add a GRANT vote to a link based on ID
app.put("/wishes/:id", (req, res) => {
    // get the grant value
    const id = parseInt(req.params.id);
    
    // Loop through the links
    wishes.forEach(wish => {

        // If the id matches
        if (wish.id == id) {

            // Update the vote count
            wish.grant += 1;

            // Report that the voting worked
            res.status(201).send({ message: "Successfully voted grant on wish. "})
        }
    });

    // If nothing got sent before now, then there was no matching link to vote on
    res.status(404).send({ error: "Unable to locate wish." });
});

app.delete("/wishes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    wishes.splice(id, 1);
    res.send("We spliced that right now");
})

module.exports = app;