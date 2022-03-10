const {Recipe,User} = require('../model/model');
const {Op} = require('sequelize');

const generalInfo = [
    'recipeId',
    'recipeName',
    'userId',
    'starRating',
    'description',
    'servings',
    'prepTimeInMin',
    'difficultyLevel',
    'createdAt',
    'updatedAt',
    'onSale'
];

const intValues = [
    'recipeId',
    'userId',
    'maxPrepTimeInMin',
    'minPrepTimeInMin',
    'prepTimeInMin',
    'minServings',
    'maxServings',
    'servings',
];

const floatValues = [
    'maxStarRating',
    'minStarRating',
    'starRating',
];

const booleanValues = [
    'onSale',
];

const userAmendField=[
    'recipeName',
    'description',
    'servings',
    'prepTimeInMin',
    'difficultyLevel',
    'onSale',
];
const upperCaseValues = [
    'difficultyLevel',
    'maxDifficultyLevel',
    'minDifficultyLevel',
];



const RecipeServices = {

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
                servings: parseInt(data.servings),
                prepTimeInMin: parseInt(data.prepTimeInMin),
                difficultyLevel: data.difficultyLevel.toUpperCase()
            });

            results.status=200;
            results.message = `${recipe.recipeName} successfully created.`;
            results.data = recipe;
        } catch(err){
            console.log(err);
            results.status = 500;
            results.message = err;
        };
        return results;

    },


    searchGeneralInfo:async function(searchParams, user){

        const results = {
            status: null,
            message: null,
            data: null,

        };

        const filteringCriteria={};

        filteringCriteria[Op.and]=[];

        for (const [key, value] of Object.entries(searchParams)){

            let individualCriteria = {}

            switch(true){
                case (key=== 'keyWord'):
                    individualCriteria[Op.or] = [
                        {'recipeName':{[Op.iLike]:'%'+value+'%'}},
                        {'description':{[Op.iLike]:'%'+value+'%'}},
                    ];
                    break;
                
                case (key==='maxPrepTimeInMin'):
                    individualCriteria['prepTimeInMin']={[Op.lte]:parseInt(value)};
                    break;

                case (key==='minPrepTimeInMin'):
                    individualCriteria['prepTimeInMin']={[Op.gte]:parseInt(value)};
                    break;

                case (key==='maxStarRating'):
                    individualCriteria['starRating']={[Op.lte]:parseFloat(value)};
                    break;

                case (key==='minStarRating'):
                    individualCriteria['starRating']={[Op.gte]:parseFloat(value)};
                    break;

                case (key==='maxServings'):
                    individualCriteria['servings']={[Op.lte]:parseInt(value)};
                    break;

                case (key==='minServings'):
                    individualCriteria['servings']={[Op.gte]:parseInt(value)};
                    break;

                case (key==='maxDifficultyLevel'):
                    individualCriteria['difficultyLevel']={[Op.lte]:value.toUpperCase()};
                    break;

                case (key==='minDifficultyLevel'):
                    individualCriteria['difficultyLevel']={[Op.gte]:value.toUpperCase()};
                    break;

                case (key==='onSale'):
                    break;
                
                case (!generalInfo.includes(key)):
                    break;

                case (intValues.includes(key)):
                    individualCriteria[key] ={[Op.eq]:parseInt(value)};
                    break;

                case (floatValues.includes(key)):
                    individualCriteria[key] ={[Op.eq]:parseFloat(value)};
                    break;

                case (upperCaseValues.includes(key)):
                    individualCriteria[key] ={[Op.eq]:value.toUpperCase()};
                    break;
                default:
                    individualCriteria[key] ={[Op.eq]:value}
                    break;

            };

            if(Object.entries(individualCriteria).length!==0){

                filteringCriteria[Op.and].push(individualCriteria);
            }
        };

        if(!user || (Object.keys(searchParams).includes('onSale')&&searchParams['onSale']==='true')){
            filteringCriteria[Op.and].push(
                {onSale:true}
                );
        }else if(user && (Object.keys(searchParams).includes('onSale')&&searchParams['onSale']==='false')){
            filteringCriteria[Op.and].push(
                {[Op.and]:[{onSale:false}, {userId:user.id}]}
            );
        } else if (user){
            filteringCriteria[Op.and].push({
                [Op.or]:[{onSale:true},{[Op.and]:[{onSale:false}, {userId:user.id}]}]
            });
        }

        console.log(filteringCriteria);
        try{
            let recipe = await Recipe.findAll({
                where: filteringCriteria
            });

            results.status=200;
            results.message=`Search completed with ${recipe.length} result(s)`;
            results.data = recipe;
            return results;

        } catch (err){
            results.status=500;
            results.message=err;
            return results;
        }

    },


    updateRecipe: async function(recipeId, data, user){

        const result = {
            status: null,
            message: null,
            data: null,
        }

        const recipe = await Recipe.findByPk(recipeId);

        if(!recipe){
            result.status=404;            
            result.message ='Recipe ID not found';
            return result;
        };

        if(recipe.userId===user.id){

            for(let[key,value] of Object.entries(data)){

                if (userAmendField.includes(key)){
                    recipe[key] = value;
                }

            }

            await recipe.save();
            await recipe.reload();
            result.status = 200;            
            result.message =`Recipe ${recipe.recipeName} sucessfully updated`;
            result.data = recipe;
            return result;
            



        } else{
            result.status=401;
            result.message ='User not authorized to amend data for this recipe.';
            return result;
        }
        
    },

    deleteRecipe: async function(recipeId, user){
        const result = {
            status: null,
            message: null,
            data: null,
        }

        const recipe = await Recipe.findByPk(recipeId);

        if(!recipe){
            result.status=404;            
            result.message ='Recipe ID not found';
            return result;
        };

        if(recipe.userId===user.id){

            const recipeName = recipe.recipeName;

            await recipe.destroy();
            result.status = 200;            
            result.message =`Recipe ${recipeName} sucessfully deleted`;
            result.data = recipe;
            return result;

        } else{
            result.status=401;
            result.message ='User not authorized to delete this recipe.';
            return result;
        }
    }
}

module.exports=RecipeServices;