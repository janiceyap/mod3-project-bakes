const Joi = require('joi');

module.exports = {

    verifyPurchase: async(req, res, next) => {
        //some validation done in model
        const purchaseDataSchema = Joi.object({
            userId: Joi.number(),
            recipeId: Joi.number(),
            purchaseDate: Joi.date(),
            subtotal: Joi.number().required(),
            paymentMethod: Joi.string().uppercase(),
            paymentTxnId: Joi.string().uppercase(),
            invoiceId: Joi.string().uppercase()
        });

        const { error } = purchaseDataSchema.validate(req.body);

        if (error) {
            res.status(400).json({
                message: 'Invalid request data',
                error: error.message
            });
        }

        next();
    }
}