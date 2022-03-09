const Joi = require('joi');

module.exports = {

    inputSteps: async(req, res, next) => {

        const stepsSchema = Joi.object({
            userId: Joi.number(),
            recipeId: Joi.number(),
            steps: Joi.string()
                .alphanum()
                .min(50)
                .max(200)
                .required(),
        });

        const {error, value} = stepsSchema.validate(req.body);
        // stepsSchema.validate({});
        console.log("Upload Steps Schema Validate Error", error);
        console.log("Upload Steps Schema Validate Value", value);

        if(error){

            res.status(400).json({
                message: 'Invalid request data.',
                error: error.message,
            });
        }
        next();
    }
};