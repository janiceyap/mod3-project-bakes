
const recipeService = require('../services/recipe.services');

class RecipeController {
    async createNew (req, res, next){

        console.log(req.body);
        const result = await recipeService.createNew(req.body, req.user);

        res.status(result.status);
        return (res.json({
            message: result.message,
            data: result.data,
        }))

    }


    // async uploadPic(req,res, next){

    //     const {recipePic} = req.body;
    //     return
    // }
}

module.exports=RecipeController;