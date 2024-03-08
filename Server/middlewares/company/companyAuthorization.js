const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    console.log ("company authorization middleware");
  // console.log (req.body.name) ;
   console.log (req.headers);
    const token = req.headers.authtoken;
    console.log (token);
    
    if (!token) {
        
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, company) => {
        if (err) {
            return res.status(403).send('Forbidden');
        }
        req.user = company;
        next();
    });
};

module.exports = { authenticateToken };
