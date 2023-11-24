const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

// On same route handle multiple request.
// use dynamic path  
app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
    .patch((req, res) => {
        return res.json({ status: "padding" });
    })
    .delete((req, res) => {
        return res.json({ status: "padding" });
    })

app.get("/api/users", (req, res) => {
    return res.json(users);
})

app.post("/api/users", (req, res) => {
    return res.json({ status: "padding" });
})





app.listen(PORT, () => {
    console.log("server run on port no", PORT);
})