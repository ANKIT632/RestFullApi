const express = require('express')
const app = express();
const { ConnectMongodb } = require("./connection.js");
const { logReqRes } = require("./middleware")
const userRouter = require('./routes/users.js')
const multer=require("multer");
const path=require('path');
const PORT = 8000;


ConnectMongodb('mongodb://0.0.0.0:27017');
 
// use for fixed the format of data which is upload.

const storage=multer.diskStorage({
// cd is call backfunction
// destination tells where file save
    destination: function(req,file,cb){
        return cb(null,"./uploads") // first arg user specify error if error occur , second where file save.
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    }

})

const upload=multer({storage});

// set config
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

// use middleware handle data which is generate from client side.
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
//add custom middleware which maintain log
app.use(logReqRes);

//Mount the Route at /users path
app.use("/users", userRouter);

app.get('/',(req,res)=>{
    console.log(req.body);
    return res.render('homepage')
})


app.post("/upload",upload.single("profileImage"),(req,res)=>{
    return res.redirect("/")
})

app.listen(PORT, () => {
    console.log("server run on port no", PORT);
})