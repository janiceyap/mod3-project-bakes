const purchaseHistoriesService = require('../services/purchasehistories.services');
   
class PurchaseHistoriesController {

    async showAll(req, res, next) {

        const result = await purchaseHistoriesService.showAll(req.params.userId);

        res.status(result.status);

        return res.json({message: result.message, data: result.data});
    }

    async newPurchase(req, res, next) {

        const result = await purchaseHistoriesService.newPurchase(req.body);

        res.status(result.status);

        return res.json({message: result.message, data: result.data});
    }

    async deletePurchase(req, res, next) {
    
        const result = await  purchaseHistoriesService.deletePurchase(req.params.purchaseId);

        res.status(result.status);

        return res.json({message: result.message, data: result.data});
    }

    async updatePurchase(req, res, next) {
        
        const result = await purchaseHistoriesService.updatePurchase(req.body);

        res.status(result.status);

        return res.json({message: result.message, data: result.data});
    }
}

module.exports = PurchaseHistoriesController;
