const recipeIngredientsService = require('../services/recipeIngredients.services');

class RecipeIngredientsController {
    async showAll(req, res, next){

        const result = await recipeIngredientsService.showAll(req.params.recipeId);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async newRecipeIngredients(req, res, next){

        const result = await recipeIngredientsService.newRecipeIngredients(
            req.params.recipeId,
            req.body.ingredientName,
            req.body.ingredientQuantity,
            req.body.ingredientUnits
        );

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async deleteRecipeIngredients(req, res, next){

        const result = await recipeIngredientsService.deleteRecipeIngredients(req.params.ingredientId);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async updateRecipeIngredients(req, res, next){

        const result = await recipeIngredientsService.updateRecipeIngredients(
            req.params.ingredientId,
            req.body
        );

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }
};

module.exports = RecipeIngredientsController;