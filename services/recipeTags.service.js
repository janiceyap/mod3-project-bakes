const {RecipeTags} = require('../model/model');

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
        const recipeTags = await RecipeTags.findAll({where: {recipeId}});
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
    deleteRecipeTags: async(tagsId) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        const recipeTags = await RecipeTags.findByPk(parseInt(tagsId));
        console.log(recipeTags);
        if(!recipeTags) {
            result.message = `Tag ${tagsId}  is not found.`;
            result.status = 400;
            return result;
        }

        await recipeTags.destroy();
        result.message = `Deletion of Tags ${tagsId} successful.`;
        result.status = 200;
        result.data = recipeTags;
        return result;
    },
}