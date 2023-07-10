const allowedOrigins = require('../config/allowedOrigins.js');




const credentials = (req, res, next) => {
    
    console.log('credentials, originHeader ==>', req.headers.origin);
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        console.log('allowedOrigins ==>', "ok");
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials