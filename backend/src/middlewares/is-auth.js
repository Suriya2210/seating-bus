const jwt = require('jsonwebtoken');
const { generate: generateToken, decode: decodeToken } = require('../utils/token');
const { JWT_SECRET_KEY } = require('../utils/secrets');

module.exports = (req,res,next)=>{
    console.log("In the isAuth middleware");
    const hasAuthHeader = req.get('Authorization');
    if(!hasAuthHeader){
        const error = new Error('Not authenticated <Missing Authorization header>');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization');
    console.log("Initial token testing "+token);
    try {
        decodedToken =  jwt.verify(token, JWT_SECRET_KEY);
        console.log("Decoded token "+JSON.stringify(decodedToken));
        console.log("Entered!");
      
    }catch(err){
        const error = "Internal error on the server <Failed to decode token>";
        error.statusCode = 404;
        throw error;
    }
    if(!decodedToken){
        const error = new Error('Not authenticated for this token');
        error.statusCode = 401;
        throw error;
    }
    req.associate_id = decodedToken.id;
    req.email = decodedToken.email;
    console.log("Access authenticated for email! "+req.associate_id+" "+req.email);
    next();  
};