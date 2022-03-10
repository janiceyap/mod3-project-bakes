const { Bookmark, Recipe } = require("../model/model")


module.exports = {
    showAll: async (user) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        const findBookmark = await Bookmark.findAll({ 
            where: {userId : user.id} 
        })


        try {
        
        if (!findBookmark.length) {
            result.message = `No bookmark found`;
            result.status = 400;
            return result;
        }

        result.message = "Bookmark loaded successfully!" 
        result.status = 200 
        result.data = findBookmark;

        return result;
        

        }catch(err) {
            console.log(err);
            result.status = 500
            result.message = "Error: Bookmark not loading";
            return result;
        }
    },

    newBookmark: async (user,recipeId) => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        try {
        const findBookmark = await Bookmark.findAll({
            where: {
                userId : user.id,
                recipeId : recipeId
            } })

        if (findBookmark.length !== 0 ) {
            result.message = `Duplicate bookmark entry`;
            result.status = 400;
            return result; 
        } 

        const newBookmarkData = await Bookmark.create(
            {
                userId : user.id ,
                recipeId : recipeId,
            }
        );
        console.log("--newBookmarkData--",newBookmarkData);
        const recipeDetails = await Recipe.findByPk(recipeId);

        result.data = recipeDetails;
        result.status = 200;
        result.message = `New Bookmark created for User ${user.id}!`;
        return result;
    
        } catch (err) {
            console.log(err);
            result.status = 400;
            result.message = err.message;
            return result;
            
        }
 
    },

    deleteBookmark: async (user,recipeId) => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        try {
        const checkBookmark = await Bookmark.findOne({
                where: {
                    userId : user.id,
                    recipeId : recipeId
                } 
            });
        
        if (!checkBookmark) {
            result.message = `Bookmark does not exist.`;
            result.status = 400;
            return result;
        }

        await checkBookmark.destroy();
        result.status = 200;
        result.message = `Delete bookmark: ${recipeId} successful!`;
        return result;

        }catch(err){
            console.log(err);
            result.status = 400;
            result.message = err.message;
            return result;
        }
    }


} 