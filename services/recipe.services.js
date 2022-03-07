const {Recipe} = require('../model/model');
const {Op} = require('sequelize');
const generalInfo = [
    'recipeId',
    'recipeName',
    'user_id',
    'starRating',
    'description',
    'servings',
    'prepTimeInMin',
    'difficultyLevel',
    'createdAt',
    'updatedAt',
    'onSale'

]

const RecipeController = {

    createNew: async function (data, user){

        console.log(data);

        const results = {
            status: null,
            message: null,
            data: null,

        };
        try{
            const recipe = await Recipe.create({
                userId: user.id,
                recipeName: data.recipeName,
                description: data.description,
                servings: data.servings,
                prepTimeInMin: data.prepTimeInMin,
                difficultyLevel: data.difficultyLevel.toUpperCase()
            });

            results.status=200;
            results.message = `${recipe.recipeName} successfully created.`;
            results.data = recipe;
        } catch(err){
            console.log(err);
            results.status = 400;
            results.message = err;
        };
        return results;

    },


    searchGeneralInfo:async function(searchParams){
        const filteringCriteria={};

        for (const [key, value] of Object.entries(searchParams)){
            if (key=== 'keyWord'){
                filteringCriteria[Op.or] = [
                    {'recipeName':{[Op.iLike]:'%'+value+'%'}},
                    {'description':{[Op.iLike]:'%'+value+'%'}},
                ]
            } else{
                filteringCriteria[key] ={[Op.eq]:value}
            }
        }

        filteringCriteria['onSale']= true;

        console.log(filteringCriteria);

        let recipe = await Recipe.findAll({
            where: filteringCriteria
        });

        return recipe;

    }
}

module.exports=RecipeController;