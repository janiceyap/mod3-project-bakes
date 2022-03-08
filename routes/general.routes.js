const express = require('express');
const router = express.Router();
const userJoi = require("../middleware/user.joi");

router.use("/", (req, res, next) => {
    console.log("You have called a general route.");
    next();
});

// All to Initialize Own General Routers Here
// Janice
const UserController = require("../controller/user.controller")
const userController = new UserController();
router.post("/user", userController.register);
router.post("/user/login", userJoi.inputLogin, userController.login);










// JianNan
const RecipeController= require('../controller/recipe.controller');
const recipeController = new RecipeController();
router.get('/recipe', recipeController.searchGeneralInfo); 
//This endpoint accepts query with the following keys and searches the recipe database for the corresponding recipe on sale. At least 1 search term is required:
// {
    // keyWord: (search base on recipeName and description), (string)
    // userId: (search base on seller's id) (int)
    // recipe_id: (search base on recipe id), (int)
    // servings: (search base on number of servings) (string),
    // prepTimeInMin: (search base on prep time in mins) (int)
// }











// Michelle















// Norman















// Manuspon























module.exports = router;