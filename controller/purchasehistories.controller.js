const purchaseHistoriesService = require('../services/purchasehistories.services');
   
class PurchaseHistoriesController {

    async showAll(req, res, next) {

        console.log("Show All User Purchases")

        if (!userId) {
            return res.status(400).json({
                message: 'userId is required'
            });
        }

        const result = await purchaseHistoriesService.showAll(userId);
        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async newPurchase(req, res, next) {

        console.log("Purchase Histories Controller: Creating new data")
        const result = await purchaseHistoriesService.newPurchase(req.body);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});


    }

}

module.exports = PurchaseHistoriesController;
