const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        //assign variable with the login token code
        const token = req.header('x-auth-token');
        if (!token)
            return res.status(401).json('Missing authentication token')
        //checks to see if the token has been decoded with the JWT string
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.status(401).json('Token verification failed')
        req.user = verified.id;
        //continue the flow of the code
        next();
    } catch (err) {
        res.json(err)
    }
}

module.exports = auth;