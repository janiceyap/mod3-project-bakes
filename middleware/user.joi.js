const Joi = require('joi');

module.exports = {

    inputLogin: async(req, res, next) => {

        const loginSchema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2 })
                .required(),

            pwd: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
        });

        const { error, value } = loginSchema.validate(req.body);

        console.log("Login Schema Validate Error", error);
        console.log("Login Schema Validate Value", value);

        if (error){

            res.status(400);

            return res.json({
                status_code: 400,
                message: "Unexpected input format."
            });
        }

        next();
    }
}