const {RecipeRating, PurchaseHistories, Recipe} =  require('../model/model');
const{Op}=require('sequelize');
const { result } = require('lodash');

const RecipeRatingServices = {

    createNew: async function (recipeId, user, ratingData){
        let results = {
            status:null,
            message: null,
            data:null,
        }
        recipeId = parseFloat(recipeId);
        const reviewerUserId = user.id;

        let rated = await RecipeRating.findOne({
            where:{[Op.and]:[{reviewerUserId},{recipeId}]}
        })

        if (rated){
            results.status=400;
            results.message = 'Rating left for this recipe.';
            return results;
        };
        let purchase =await  PurchaseHistories.findOne({
            where:{[Op.and]:[{userId:reviewerUserId},{recipeId:recipeId}]}
        });

        if(!purchase){
            results.status=401;
            results.message = 'User not authorized to leave a rating without a purchase.';
            return results;
        };

        let recipe = await Recipe.findByPk(recipeId);
        let allRatingsForRecipe = await RecipeRating.findAll({
            where: {recipeId}
        })

        let totalstarRating = allRatingsForRecipe.reduce((prevValue, rating)=>{
            return prevValue + rating.starRating;
        }, 0);

        recipe.starRating = (parseInt(ratingData.starRating)+totalstarRating)/(allRatingsForRecipe.length+1);

        try{

            let rating = await RecipeRating.create({
                starRating: ratingData.starRating,
                comments: ratingData.comments,
                reviewerUserId: user.id,
                recipeId,
            });

            await recipe.save();
            await recipe.update();

            results.status = 200;
            results.message = `Rating for recipei id ${recipeId} successfully recorded.`;
            results.data = {rating, recipe};
            return results;
        } catch(err){

            results.status = 500;
            results.message = err;

            return results;

        }
    },
};

module.exports=RecipeRatingServices;