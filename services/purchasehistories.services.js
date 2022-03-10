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

        } catch (err) {
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

            const findPurchase = await PurchaseHistories.findOne({ where: 
                {
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
            
            const allPurchase = await PurchaseHistories.findAll()
            console.log("---allPurchase---",allPurchase)

            if (allPurchase.length === 0) {
                nextInvoiceNo = "SB1000";   
            } 
            else {
                    const findLastInvoice = await PurchaseHistories.findAll({ limit: 1, order: [ [ 'id', "DESC"]] });
                    console.log("---findLastInvoiceNo---",findLastInvoice[0].invoiceId)
                    nextInvoiceNo = "SB"+(parseInt(findLastInvoice[0].invoiceId.slice(2))+1)
                }

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
                invoiceId : nextInvoiceNo,
            }
            );

            result.data = newPurchase;
            result.status = 200;
            result.message = `New Purchase created!`;
            return result;


        } catch (err) {
            console.log(err);
            result.status = 500;
            result.message = err.message;
            return result;
        }

    }
}