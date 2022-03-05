const { PurchaseHistories } = require( "../model/model" );

module.exports = {

    showAll: async () => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        const data = await PurchaseHistories.findAll( {where: { userId : UserId}})

        result.message = `Show all purchases from ${userId}.`
        result.status = 200;
        result.data = data;

        return result;
    },

    newPurchase: async (newPurchaseDetails) => {

        await PurchaseHistories.sync();
        let result = {
            message: null,
            status: null,
            data: null,
        }
        try {
        const newPurchase = await PurchaseHistories.create(
            { 
                userId: newPurchaseDetails.userId,
                recipeId: newPurchaseDetails.recipeId,
                purchaseDate: newPurchaseDetails.purchaseDate,
                subtotal: newPurchaseDetails.subtotal,
                gst: newPurchaseDetails.gst,
                total: newPurchaseDetails.total,
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

/* raw json test data. note need userId and recipeId FK

{
"userId": 1,
"recipeId": 101,
"purchaseDate": ,
"subtotal": 20,
"gst": 1.40,
"total": 21.40,
"paymentTxnId" : "A123456789Z",
"paymentMethod": "VISA",
"invoiceId" : "SB1001"
}

*/
 