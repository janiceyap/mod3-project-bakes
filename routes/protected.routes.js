const express = require('express');
const router = express.Router();
const jwtauthenticate = require("../middleware/jwtauthenticate");
const purchaseHistJoi = require("../middleware/purchasehistories.joi.js");


router.use("/", (req, res, next) => {
    console.log("You have called a protected route.");
    next();
});

router.use(jwtauthenticate.isLoggedIn); // calling jwt verification for everyone.

// All to Initialize Own Protected Routers Here
// Janice
const UserController = require("../controller/user.controller")
const userController = new UserController();
router.get("/user", jwtauthenticate.isAdmin, userController.showAll);
router.delete("/user", jwtauthenticate.canEditUser, userController.deleteUser);
router.post("/follow", userController.followUser);
router.post("/unfollow", userController.unfollowUser);






// JianNan
const RecipeController = require('../controller/recipe.controller');
const RecipeRatingController = require('../controller/recipeRating.controller');
const recipeController = new RecipeController();
const recipeRatingController = new RecipeRatingController();
router.post('/recipe',recipeController.createNew);// post new recipe with the following properties sent as json in body: recipeName(string), description(string), servings(int), prepTimeInMin(int), difficultyLevel(EASY, INTERMEDIATE or HARD) 
router.put('/recipe/:recipeId', recipeController.updateRecipe); 
// update recipe belonging to the recipe own. Accept following properties sents as json in body:  recipeName(string), description(string), servings(int), prepTimeInMin(int), difficultyLevel(EASY, INTERMEDIATE or HARD), onSale(boolean)
router.delete('/recipe/:recipeId', recipeController.deleteRecipe); //delete recipeId belonging to the recipe owner only. Must include query ?confirm=true
router.get('/recipe', recipeController.searchGeneralInfoP);// similar to search in General. Accept onSale= true to filter away user's recipe not on sale.
router.post('/recipeRating/:recipeId', recipeRatingController.createNew); //allow user who have purchased a recipe (:recipeId) to leave a rating. Accepts a JSON object with starRating(int)>0,<5 (required) and comments (500 char).














// Michelle
const RecipeStepsController = require('../controller/recipeSteps.controller');
const recipeStepsController = new RecipeStepsController();
const recipeStepsJoi = require('../middleware/recipeSteps.joi.js')
router.get('/recipeSteps/:recipeId', recipeStepsController.showAll);
router.post('/recipeSteps/:recipeId', recipeStepsJoi.inputSteps, recipeStepsController.newRecipeSteps);
router.put('/recipe/:stepsId', recipeStepsController.updateRecipeSteps);
router.delete('/recipe/:stepsId', recipeStepsController.deleteRecipeSteps);








// Norman
const RecipeTagsController = require('../controller/recipeTags.controller');
const recipeTagsController =new RecipeTagsController();
const recipeTagsJoi = require('../middleware/recipetags.joi')
router.post('/recipetags/:recipeId', recipeTagsJoi.inputTags,recipeTagsController.newRecipeTags); // create new tag
router.delete('/recipetags/:tagsId', recipeTagsController.deleteRecipeTags); //Delete Tags from Recipe




 






// Manuspon 83
const PurchaseHistoriesController = require("../controller/purchasehistories.controller")
const purchaseHistoriesController = new PurchaseHistoriesController();
router.get("/purchasehistories", purchaseHistoriesController.showAll);
router.post("/purchasehistories", purchaseHistJoi.verifyPurchase,purchaseHistoriesController.newPurchase);

const BookmarkController = require("../controller/bookmark.controller");
const { RecipeRating } = require('../model/model');
const bookmarkController = new BookmarkController();
router.get("/bookmark", bookmarkController.showAll);
router.post("/bookmark",bookmarkController.newBookmark);
router.delete("/bookmark",bookmarkController.deleteBookmark);





















module.exports = router;