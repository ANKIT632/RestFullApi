const express = require('express')
const users = require('./Data.json');
const fs = require('fs');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },

}, { timestamps: true });

mongoose.connect('mongodb://0.0.0.0:27017').then(() => {
    console.log("mongoDB Connected");
}).catch((err) => {
    console.log("mongo Error", err);
})

const User = mongoose.model("user", userSchema);

// use middleware handle data which is generate from client side.
app.use(express.urlencoded({ extended: false }));

//add custom middleware which maintain log


app.use((req, res, next) => {


    fs.appendFile('log.txt', `\n${new Date(Date.now() + (new Date() - Date.now()))} : ${req.ip}  ${req.method} : ${req.path}`, (err, data) => {
        next();
    });

});


// On same route handle multiple request.
// use dynamic path  
app.route("/api/users/:id").get((req, res) => {

    res.setHeader("X-data", "give specific data");
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user)
        return res.json(user);

    else
        return res.status(404).json({ status: "data not found" });
})

    //Edit the user.
    .patch((req, res) => {
        const id = req.params.id;
        const body = req.body;


        return res.json({ status: "padding" });
    })
    .delete((req, res) => {
        return res.json({ status: "padding" });
    })

app.get("/api/users", async (req, res) => {
    const users = await User.find({});
    return res.json(users);
})

app.post("/api/users", async (req, res) => {

    const body = req.body;

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,

    })
    return res.status(201).json({ status: "success" });


});





app.listen(PORT, () => {
    console.log("server run on port no", PORT);
})