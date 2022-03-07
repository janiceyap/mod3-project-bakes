const { PurchaseHistories, User } = require( "../model/model" );
const { deleteUser } = require("./user.services");

module.exports = {

    showAll: async (userId) => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        const user = await User.findByPk(userId);
        
        const purchasesDetails = await PurchaseHistories.findAll( {where: { userId : userId }})

        console.log ("---Purchase Details---: ",purchasesDetails);
        if ( !purchasesDetails.length ) {
            result.message = `No purchase history found for user ${userId}`;
            result.status = 404;
            return result; 
        } 
        
        result.message = `Show all purchases from User ${userId} ${user.name}`
        result.status = 200;
        result.data = purchasesDetails;

        return result;
    },

    newPurchase: async (newPurchaseDetails) => {

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


    },
    deletePurchase: async (purchaseId) =>{
        let result = {
            message: null,
            status: null,
            data: null,

        }

        const purchase = await PurchaseHistories.findByPk(purchaseId);

        if (!purchase) {
            result.message = `Purchase ${purchaseId} is not found`;
            result.status = 400;
            return result;
        }

        await purchase.destroy() 
        result.data = purchase;
        result.status = 200;
        result.message = `Delete purchase ${purchaseId} successful!`;
        return result;
    },

    updatePurchase: async (updateDetails) => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        const purchase = await PurchaseHistories.findByPk(updateDetails.purchaseId);

        if (!purchase) {
            result.message = `Purchase is not found`;
            result.status = 400;
            return result;
        }

        //to add logic for partial update
        purchase.id = updateDetails.purchaseId;
        purchase.userId = updateDetails.userId;
        purchase.recipeId = updateDetails.recipeId;
        purchase.purchaseDate = updateDetails.purchaseDate;
        purchase.subtotal = updateDetails.subtotal;
        purchase.gst = updateDetails.gst;
        purchase.total = updateDetails.total;
        purchase.paymentTxnId = updateDetails.paymentTxnId;
        purchase.paymentMethod = updateDetails.paymentMethod;
        purchase.invoiceId = updateDetails.invoiceId;
        await purchase.save();
        result.data = purchase;
        result.status = 200;
        result.message = "Update Purchase History successful!";
        return result;



    }

}