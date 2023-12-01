const mongoose = require('mongoose');

const ConnectMongodb = (url) => {

    const conn = mongoose.connect(url).then(() => {
        console.log("mongoDB Connected");
    }).catch((err) => {
        console.log("mongo Error", err);
    })

    return conn;
}


module.exports = {
    ConnectMongodb,
};