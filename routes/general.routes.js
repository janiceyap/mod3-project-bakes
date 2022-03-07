const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    return res.send("You have called a general route");
});

// All to Initialize Own General Routers Here

// Janice
// const UserController = require("../controller/user.controller")
// const userController = new UserController();
// router.get("/general/vehicle", vehicleController.showAll);












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