const { PurchaseHistories, User } = require( "../model/model" );
let gst = 0.07;

module.exports = {

    showAll: async (userId) => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        try {

        const user = await User.findByPk(userId);
        const purchasesDetails = await PurchaseHistories.findAll( {where: {userId : userId}} )

        //console.log ("---Purchase Details---: ",purchasesDetails);
        if ( !purchasesDetails.length ) {
            result.message = `No purchase history found for user ${userId}`;
            result.status = 400;
            return result; 
        } 

        result.message = `Show all purchases from User ${userId} ${user.name}`
        result.status = 200;
        result.data = purchasesDetails;

        return result;

        } catch(err) {
            console.log(err);
            result.message = err.message;
            return result;
        }
    },

    newPurchase: async (newPurchaseDetails) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }
        try {

            const findPurchase = await PurchaseHistories.findOne({
                where: {
                    userId : newPurchaseDetails.userId,
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
                    userId: newPurchaseDetails.userId,
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

    },

    deletePurchase: async (purchaseId) =>{
        let result = {
            message: null,
            status: null,
            data: null,
        }

        try {
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

        }catch(err) {
            console.log(err);
            result.message = err.message;
            return result;
        }
    },

    updatePurchase: async (update) => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        const purchase = await PurchaseHistories.findByPk(update.purchaseId);

        if (!purchase) {
            result.message = `Purchase is not found.`;
            result.status = 400;
            return result;
        }

        //check duplicate purchase by same userId
        const findPurchase = await PurchaseHistories.findOne({
            where: {
                userId : update.userId,
                recipeId : update.recipeId
            }
        })

        if (findPurchase) {
            result.message = `Customer has already purchased this recipe!`;
            result.status = 400;
            return result;

        }

        //selective update //postman may display many decimal place D.P, database will take in only 2 D.P
        try {
            if (update.userId) purchase.userId = update.userId;
            if (update.recipeId) purchase.recipeId = update.recipeId;
            if (update.purchaseDate) purchase.purchaseDate = update.purchaseDate;
            if (update.subtotal) {
                purchase.subtotal = update.subtotal;
                purchase.gst = purchase.subtotal*gst;
                purchase.total = purchase.subtotal + purchase.gst;
                }   
            if (update.paymentTxnId) purchase.paymentTxnId = update.paymentTxnId;
            if (update.paymentMethod) purchase.paymentMethod = update.paymentMethod;
            if (update.invoiceId) purchase.invoiceId = update.invoiceId;

            await purchase.save( { validate: true } );

        } catch(err) {
            console.log(err);
            result.message = `Oops! Update didn't go through, ${err}`;
            result.status = 400;
            return result;
        }

        result.data = purchase;
        result.status = 200;
        result.message = `Update Purchase successful!`;
        return result;

    }

}