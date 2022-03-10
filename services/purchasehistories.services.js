const { PurchaseHistories, User } = require( "../model/model" );
let gst = 0.07;

module.exports = {

    showAll: async (user) => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        try {

        const findUser = await User.findByPk(user.id);
        const purchasesDetails = await PurchaseHistories.findAll( {where: {userId : user.id}} )

        //console.log ("---Purchase Details---: ",purchasesDetails);
        if ( !purchasesDetails.length ) {
            result.message = `No purchase history found for user ${user.id}`;
            result.status = 400;
            return result; 
        } 

        result.message = `Show all purchases from User ${user.id} ${findUser.name}`
        result.status = 200;
        result.data = purchasesDetails;

        return result;

        } catch(err) {
            console.log(err);
            result.message = err.message;
            return result;
        }
    },

    newPurchase: async (newPurchaseDetails,user) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }
        try {

            const findPurchase = await PurchaseHistories.findOne({
                where: {
                    userId : user.id,
                    recipeId : newPurchaseDetails.recipeId
                }
            })

            if (findPurchase) {
                result.status = 400;
                result.message = `Customer has already purchased this recipe!`;
                return result;
            }
                let computeGST = newPurchaseDetails.subtotal*gst;
                let computeTotal = newPurchaseDetails.subtotal + computeGST; 

            const newPurchase = await PurchaseHistories.create(
                { 
                    userId: user.id,
                    recipeId: newPurchaseDetails.recipeId,
                    purchaseDate: newPurchaseDetails.purchaseDate,
                    subtotal: newPurchaseDetails.subtotal,
                    gst: computeGST,
                    total: computeTotal,
                    paymentTxnId : newPurchaseDetails.paymentTxnId,
                    paymentMethod: newPurchaseDetails.paymentMethod,
                    invoiceId : newPurchaseDetails.invoiceId,
                }
            );

            result.data = newPurchase;
            result.status = 200;
            result.message = `New Purchase created!`;
            return result;

        } catch(err) {
            console.log(err);
            result.status = 500;
            result.message = err.message;
            return result;
        }

    }
}