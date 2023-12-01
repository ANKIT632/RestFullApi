const fs = require('fs');

const logReqRes = (req, res, next) => {
    fs.appendFile('log.txt', `\n${new Date(Date.now() + (new Date() - Date.now()))} : ${req.ip}  ${req.method} : ${req.path}`, (err, data) => {
        next();
    });

}

module.exports = {
    logReqRes,
}

