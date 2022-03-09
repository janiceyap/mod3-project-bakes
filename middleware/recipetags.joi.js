const Joi = require('joi');

module.exports = {
    
    inputTags: async(req, res, next) =>{

        const tagsSchema = Joi.object({
            recipeId: Joi.number(),
            tagName:Joi.string().required()
        });

        const {error} = tagsSchema.validate(req.body);

        if(error){
            res.status(400).json({
                message: 'Invalid request data',
                error: error.message,
            });
        }
        next();
    }
};

