
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

    };

    async searchGeneralInfo(req, res, next){
        console.log(`in searchGeneralInfo with query`);
        
        console.log(req.query);

        if(Object.keys(req.query).length===0){
            res.status(400);
            return(res.json({
                message: 'Please provide a search parameter',
            }))
        };

        try{
            let recipe = await recipeService.searchGeneralInfo(req.query);

            res.status(200)

            return(res.json({
                data: recipe
            }))
        } catch(err){

            console.log(err);
            res.status(500)

            return(res.json({
                message:err
            }));
        };


    };

    async updateRecipe(req, res, next){

        console.log('in updateRecipe');

        if(Object.entries(req.body).length === 0|| !req.params.recipeId){
            res.status(400);
            return (res.json({
                message:`invalid request`,
            }))
        };


        try{

            let result = await recipeService.updateRecipe(req.params.recipeId, req.body, req.user);

            res.status(result.status);

            return(res.json({
                message: result.message,
                new_data: result.data,
            }))
        } catch(err){

            console.log(err);
            res.status(500)

            return(res.json({
                message:err
            }));
        };

    }


    // async uploadPic(req,res, next){

    //     const {recipePic} = req.body;
    //     return
    // }
}

module.exports=RecipeController;