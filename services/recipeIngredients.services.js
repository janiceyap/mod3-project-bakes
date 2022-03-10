const {RecipeIngredients} = require('../model/model');

module.exports = {

    showAll: async (recipeId) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        const recipeIngredients = await RecipeIngredients.findAll({where: {recipeId}});
        console.log('Recipe Ingredients:', recipeIngredients);

        if(!recipeIngredients.length) {
            result.message = `No ingredients found under ${recipeId}.`;
            result.status = 404;
            return result;
        }

        result.message = `Showing Ingredients from Recipe ${recipeId}.`;
        result.status = 200;
        result.data = recipeIngredients;
        return result;
    },

    newRecipeIngredients: async (recipeId, newRecipeIngredients, newIngredientQuantity, newIngredientUnits) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        try {
            const newIngredients = await RecipeIngredients.create(

                {
                    recipeId: recipeId,
                    ingredientName: newRecipeIngredients,
                    ingredientQuantity: newIngredientQuantity,
                    ingredientUnits: newIngredientUnits
                }
            );
            
            result.message = `New recipe ingredient created.`;
            result.status = 200;
            result.data = newIngredients;
            return result;
        } catch(err) {
            console.log(err);
            result.message = err.message;
            result.status = 500;
            return result;
        }
    },

    deleteRecipeIngredients: async (ingredientId) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        const recipeIngredients = await RecipeIngredients.findByPk(ingredientId);

        if(!recipeIngredients) {
            result.message = `Ingredient ${ingredientId} from Recipe is not found.`;
            result.status = 400;
            return result;
        }

        await recipeIngredients.destroy();
        result.message = `Deletion of ingredient ${ingredientId} successful.`;
        result.status = 200;
        result.data = recipeIngredients;
        return result;
    },

    updateRecipeIngredients: async(ingredientId, updateIngredients) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        const recipeIngredients = await RecipeIngredients.findByPk(ingredientId);
        
        if(!recipeIngredients) {
            result.message = `Ingredient not yet created.`;
            result.status = 400;
            return result;
        }

        recipeIngredients.recipeId = updateIngredients.recipeId;
        recipeIngredients.ingredientName = updateIngredients.ingredientName;
        recipeIngredients.ingredientQuantity = updateIngredients.ingredientQuantity;
        recipeIngredients.ingredientUnits = updateIngredients.ingredientUnits;
        await recipeIngredients.save();
        result.message = `Update ingredient successfully.`;
        result.status = 200;
        result.data = recipeIngredients;
        return result;
    }
};