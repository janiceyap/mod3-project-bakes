const purchaseHistoriesService = require('../services/purchasehistories.services');
   
class PurchaseHistoriesController {

    async showAll(req, res, next) {

        const result = await purchaseHistoriesService.showAll(req.user);

        res.status(result.status);

        return res.json({message: result.message, data: result.data});
    }

    async newPurchase(req, res, next) {

        const result = await purchaseHistoriesService.newPurchase(req.body,req.user);

        res.status(result.status);

        return res.json({message: result.message, data: result.data});
    }

}

module.exports = PurchaseHistoriesController;
