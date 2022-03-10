const recipeRatingServices = require('../services/recipeRating.services');

class RecipeRatingController{
    async createNew(req, res, next){

        console.log(`In createNew Rating with`, req.body, req.params);

        if(!req.body.starRating||!req.params.recipeId){
            res.status=400;
            return res.json({message:"Invalid request"})
        }

        let results = await recipeRatingServices.createNew(req.params.recipeId, req.user, req.body)
        
        res.status(results.status);
        return res.json({
            message:results.message,
            data: results.data,
        })


    }
}

module.exports = RecipeRatingController;