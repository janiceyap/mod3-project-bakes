const express = require('express');
const router = express.Router();

router.get("/protected", (req, res) => {
    return res.send("You have called a protected route");
});

// All to Initialize Own Protected Routers Here

// Janice
const UserController = require("../controller/user.controller")
const userController = new UserController();
router.get("/protected/user", userController.showAll);
router.post("/protected/user", userController.register);











// JianNan















// Michelle















// Norman















// Manuspon
const PurchaseHistoriesController = require("../controller/purchasehistories.controller")
const purchaseHistoriesController = new PurchaseHistoriesController();
router.get("/protected/purchasehistories", purchaseHistoriesController.showAll);
router.post("/protected/purchasehistories", purchaseHistoriesController.newPurchase);






















module.exports = router;