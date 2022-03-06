const { Op } = require('sequelize/types');
const Recipe = require('../model/model');
const generalInfo = [
    'recipeId',
    'recipeName',
    'user_id',
    'starRating',
    'description',
    'servings',
    'prepTimeInMin',
    ' difficultyLevel',
    'createdAt',
    'updatedAt',
    'onSale'

]

const RecipeController = {
    searchGeneralInfo:function(searchParams){
        const filteringCriteria={};

        for (const [key, value] of Object.entries(searchParams)){
            if (key=== 'recipeName' || key==='description'){
                filteringCriteria[key] = {[Op.iLike]:('%'+value+'%')}
            } else{
                filteringCriteria[key] ={[Op.eq]:value}
            }
        }

        let recipe = Recipe.findAll({
            where: filteringCriteria
        });

        return recipe;





    }
}