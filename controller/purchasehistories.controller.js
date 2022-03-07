const { result } = require('lodash');
const purchaseHistoriesService = require('../services/purchasehistories.services');
   
class PurchaseHistoriesController {

    async showAll(req, res, next) {

        //console.log("Show User Purchases")
        const result = await purchaseHistoriesService.showAll(req.params.userId);
        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async newPurchase(req, res, next) {

        //console.log("Purchase Histories Controller: Creating new data")
        const result = await purchaseHistoriesService.newPurchase(req.body);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async deletePurchase(req, res, next) {
    
        const result = await  purchaseHistoriesService.deletePurchase(req.params.purchaseId);
        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async updatePurchase(req, res, next) {
        const result = await purchaseHistoriesService.updatePurchase(req.body);
        res.status(result.status);
        return res.json({data: result.data, message: result.message});
    }

}

module.exports = PurchaseHistoriesController;
