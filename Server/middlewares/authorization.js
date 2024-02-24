const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    console.log ("aahcadsl");
  // console.log (req.body.name) ;
   console.log (req.headers);
    const token = req.headers.authtoken;
    
    if (!token) {
        
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Forbidden');
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
