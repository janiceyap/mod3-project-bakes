const Joi = require('joi');

module.exports = {

    verifyPurchase: async(req, res, next) => {
        //some validation done in model
        const purchaseDataSchema = Joi.object({
            userId: Joi.number(),
            recipeId: Joi.number(),
            purchaseDate: Joi.date(),
            subtotal: Joi.number().positive().greater(0).required(),
            paymentMethod: Joi.string().uppercase(),
            paymentTxnId: Joi.string().uppercase(),
            invoiceId: Joi.string().uppercase()
        });

        const { error, value } = purchaseDataSchema.validate(req.body);

        console.log("Login Schema Validate Error", error);
        console.log("Login Schema Validate Value", value);

        if (error) {
            res.status(400).json({
                message: 'Invalid request data',
                error: error.message
            });
        }

        next();
    }
}