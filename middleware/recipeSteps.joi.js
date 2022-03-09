const Joi = require('joi');

module.exports = {

    inputSteps: async(req, res, next) => {

        const stepsSchema = Joi.object({
            recipeId: Joi.number(),
            stepsNo: Joi.array().items(
                Joi.string()
                .max(500)              
            ).required(),
        });

        const {error} = stepsSchema.validate(req.body);
        // // stepsSchema.validate({});
        // console.log("Upload Steps Schema Validate Error", error);
        // console.log("Upload Steps Schema Validate Value", value);

        if(error){

            res.status(400).json({
                message: 'Invalid request data.',
                error: error.message,
            });
        }
        next();
    }
};