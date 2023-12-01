const express = require('express')
const app = express();
const { ConnectMongodb } = require("./connection.js");
const { logReqRes } = require("./middleware")
const userRouter = require('./routes/users.js')

const PORT = 8000;
ConnectMongodb('mongodb://0.0.0.0:27017');


// use middleware handle data which is generate from client side.
app.use(express.urlencoded({ extended: false }));

//add custom middleware which maintain log
app.use(logReqRes);

//Mount the Route at /users path
app.use("/users", userRouter)



app.listen(PORT, () => {
    console.log("server run on port no", PORT);
})