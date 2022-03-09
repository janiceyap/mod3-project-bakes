const recipeTagsService = require('../services/recipeTags.service');

class RecipeTagsController {
    async newRecipeTags (req, res, next) {
        
        console.log(`creating new tag`, req.body);
        const result = await recipeTagsService.newRecipeTags(req.params.recipeId, req.body.tagName);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    };

    async showTags(req, res, next){

        const result = await recipeTagsService.showTags(req.params.recipeId);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    };
    async deleteRecipeTags(req, res, next){

        const result = await recipeTagsService.deleteRecipeTags(req.params.tagsId);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }
}

module.exports = RecipeTagsController;