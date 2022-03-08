const Joi = require('joi');

module.exports = {

    inputSteps: async(req, res, next) => {

        const stepsSchema = Joi.object({
            steps: Joi.string()
                .alphanum()
                .min(50)
                .max(200)
                .required(),
        })

        stepsSchema.validate({});
    }
};