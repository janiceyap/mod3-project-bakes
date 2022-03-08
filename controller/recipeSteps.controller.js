const recipeStepsService = require('../services/recipeSteps.services');

class RecipeStepsController {
    async showAll(req, res, next){

        const result = await recipeStepsService.showAll(req.params.recipeId);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async newRecipeSteps(req, res, next){

        const result = await recipeStepsService.newRecipeSteps(req.params.recipeId, req.body.stepsNo);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async deleteRecipeSteps(req, res, next){

        const result = await recipeStepsService.deleteRecipeSteps(req.params.stepsId);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async updateRecipeSteps(req, res, next){

        const result = await recipeStepsService.updateRecipeSteps(req.body);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }
};

module.exports = RecipeStepsController;