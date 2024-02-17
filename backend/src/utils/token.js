const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const { logger } = require('./logger');

const generate = (id,email) => jwt.sign({ id:id,email:email }, JWT_SECRET_KEY, { expiresIn: '12h'});

const decode = (token) => {
    try {
        console.log("From decode "+typeof(token))
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
        console.log("decoded token-->"+decodedToken);
        return decodedToken;
    } catch (error) {
        logger.error("Error from decoding "+error);
    }
};

module.exports = {
    generate,
    decode
}