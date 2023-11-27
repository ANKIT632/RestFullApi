const express = require('express')
const users = require('./Data.json');
const fs = require('fs');
const app = express();
const PORT = 8000;


// use middleware handle data which is generate from client side.
app.use(express.urlencoded({ extended: false }));

//add custom middleware which maintain log


app.use((req,res,next)=>{
   fs.appendFile('log.txt',`\n${new Date(Date.now() + (new Date() - Date.now()))} : ${req.ip}  ${req.method} : ${req.path}`,(err,data)=>{
    next();
   });
  
});


// On same route handle multiple request.
// use dynamic path  
app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

     //Edit the user.
    .patch((req, res) => {
        const id= req.params.id;
        const body =req.body;
        

        return res.json({ status: "padding" });
    })
    .delete((req, res) => {
        return res.json({ status: "padding" });
    })

app.get("/api/users", (req, res) => {
    return res.json(users);
})

app.post("/api/users", (req, res) => {
  
    const body = req.body;
    users.push({ id: users.length + 1, ...body });

    //add new file with update data
    fs.writeFile("./Data.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    });


});





app.listen(PORT, () => {
    console.log("server run on port no", PORT);
})