const express = require('express');
const router = express.Router();
const jwtauthenticate = require("../middleware/jwtauthenticate");

router.get("/", (req, res) => {
    return res.send("You have called a protected route");
});

// All to Initialize Own Protected Routers Here
// Janice
const UserController = require("../controller/user.controller")
const userController = new UserController();
router.get("/user", userController.showAll);
router.post("/user", userController.register);
router.delete("/user", jwtauthenticate.isLoggedIn, userController.deleteUser);
router.post("/user/login", userController.login);









// JianNan
const RecipeController = require('../controller/recipe.controller');
const recipeController = new RecipeController();
router.use(jwtauthenticate.isLoggedIn);
router.post('/recipe',recipeController.createNew);
// router.get('/recipe/:recipeId',recipe.retrieveByID);















// Michelle















// Norman















// Manuspon
const PurchaseHistoriesController = require("../controller/purchasehistories.controller")
const purchaseHistoriesController = new PurchaseHistoriesController();
router.get("/purchasehistories/user/:userId", jwtauthenticate.isLoggedIn,purchaseHistoriesController.showAll);
router.post("/purchasehistories", jwtauthenticate.isLoggedIn,purchaseHistoriesController.newPurchase);
router.put("/purchasehistories",jwtauthenticate.isLoggedIn,purchaseHistoriesController.updatePurchase);
router.delete("/purchasehistories/:purchaseId",jwtauthenticate.isLoggedIn,purchaseHistoriesController.deletePurchase);






















module.exports = router;