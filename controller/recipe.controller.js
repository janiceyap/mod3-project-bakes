
const recipeService = require('../services/recipe.services');

class RecipeController {

    async createNew (req, res, next){

        console.log(`creating new recipe`, req.body);
        const result = await recipeService.createNew(req.body, req.user);

        res.status(result.status);
        return (res.json({
            message: result.message,
            data: result.data,
        }))

    };

    async searchGeneralInfo(req, res, next){
        console.log(`Searching recipe with search terms`, req.query);

        // if(Object.keys(req.query).length===0){
        //     res.status(400);
        //     return(res.json({
        //         message: 'Please provide a search parameter',
        //     }))
        // };

        
        let result = await recipeService.searchGeneralInfo(req.query);

        res.status(result.status)

        return(res.json({
            message: result.message,
            data: result.data,
        }))
       
        };

    async updateRecipe(req, res, next){

        console.log(`Updating recipe ${req.params.recipe.Id} with`, req.body);

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

    };

    async deleteRecipe(req, res, next){

        console.log(`Delete recipe id ${req.params.recipeId}. Confirmation: ${req.query.confirm}`);

        if (!req.params.recipeId || req.query.confirm!=='true'){
            res.status(400);
            return (res.json({
                message:`invalid request`,
            }));
        }

        try{

            let result = await recipeService.deleteRecipe(req.params.recipeId, req.user);

            res.status(result.status);

            return(res.json({
                message: result.message,
                new_data: result.data,
            }));
        }catch(err){

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