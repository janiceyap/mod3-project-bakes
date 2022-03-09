const {RecipeSteps, Recipe} = require('../model/model');

//const recipeSteps = []; Shld i portray this as empty array so that steps will be numbered 
//as per index?

module.exports = {
    showAll: async (recipeId) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        // const recipe = await Recipe.findByPk(recipeId);
        const recipeSteps = await RecipeSteps.showAll({where: {recipeId}});
        console.log('Recipe Steps:', recipeSteps);

        if(!recipeSteps.length){
            result.message = `No steps registered under ${recipeId}.`;
            result.status = 404;
            return result;
        }
        result.message = `Showing steps from Recipe ${recipeId}`;
        result.status = 200;
        result.data = recipeSteps;
        return result;
    },

    newRecipeSteps: async (recipeId, newRecipeSteps) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        try {
            const newSteps = await RecipeSteps.create(
                {
                    recipeId: recipeId,
                    stepsNo: newRecipeSteps,
                }
            );
            result.data = newSteps;
            result.status = 200;
            result.message = `New recipe steps created.`;
            return result;
        } catch(err) {
            console.log(err);
            result.message = err.message;
            result.status = 500;
            return result;
        }
    },

    deleteRecipeSteps: async(stepsId) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        const recipeSteps = await RecipeSteps.findByPk(stepsId);

        if(!recipeSteps) {
            result.message = `Step ${stepsId} from Recipe ${recipeId} is not found.`;
            result.status = 400;
            return result;
        }

        await recipeSteps.destroy();
        result.message = `Deletion of step ${stepsId} successful.`;
        result.status = 200;
        result.data = recipeSteps;
        return result;
    },

    updateRecipeSteps: async(updateSteps) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        const recipeSteps = await RecipeSteps.findByPk(updateSteps.stepsId);

        if(!recipeSteps) {
            result.message = `Recipe step not found`;
            result.status = 400;
            return result;
        }

        // steps.id = updateSteps.stepsId;
        await recipeSteps.save();
        result.message = `Update steps successfully.`;
        result.status = 200;
        result.data = recipeSteps;
        return result;
    }
};
