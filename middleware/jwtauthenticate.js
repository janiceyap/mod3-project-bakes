const jwt = require( 'jsonwebtoken' );
require('dotenv').config()

module.exports = {

    isLoggedIn: async(req, res, next) => {
        
        const token = req.headers.token;

        // if no token present, means not logged in
        if (!token) {

            res.status(401);

            return res.json({
                status_code: 401,
                message: "Login to Access this information"
            });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err,user) => {

            if (err) {

                res.status(401);
    
                return res.json({
                    status_code: 401,
                    message: "Login session has expired."
                });
            } 

            req.user = user;
            next();

        });
    }

}