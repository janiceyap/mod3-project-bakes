const{RecipeTags, Recipe} = require('../model/model');

module.exports = {
    newRecipeTags: async (recipeId, newRecipeTags) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        try {
            const newTags = await RecipeTags.create(
                {
                    recipeId: recipeId,
                    tagName: newRecipeTags,
                }
            );
            result.data = newTags;
            result.status = 200;
            result.message = `New recipe tag created.`;
            return result;
        } catch(err) {
            console.log(err);
            result.message = err.message;
            result.status = 500;
            return result;
        }
    },
    showTags: async (recipeId) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        // const recipe = await Recipe.findByPk(recipeId);
        const recipeTags = await RecipeTags.showTags({where: {recipeId}});
        console.log('Recipe Tags:', recipeTags);

        if(!recipeTags.length){
            result.message = `No Tags registered under ${recipeId}.`;
            result.status = 404;
            return result;
        }
        result.message = `Showing Tags from Recipe ${recipeId}`;
        result.status = 200;
        result.data = recipeTags;
        return result;
    },
    deleteRecipeTags: async(stepsId) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        const recipeTags = await RecipeTags.findByPk(stepsId);

        if(!recipeSteps) {
            result.message = `Tag ${tagsId} from Recipe ${recipeId} is not found.`;
            result.status = 400;
            return result;
        }

        await recipeTags.destroy();
        result.message = `Deletion of Tags ${stepsId} successful.`;
        result.status = 200;
        result.data = recipeSteps;
        return result;
    },
}