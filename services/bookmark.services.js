const { result } = require("lodash");
const { Bookmark } = require("../model/model")


module.exports = {
    showAll: async () => {

        let result = {
            message: null,
            status: null,
            data: null,
        }
        try {

        const data = await Bookmark.findAll({ where: {userId : userId} })

        result.message = "Bookmark loaded successfully!" 
        result.status = 200 
        result.data = data 

        return result;
        

        }catch(err) {
            console.log(err);
            result.status = 500
            result.message = "Error: Bookmark not loading";
            return result;
        }
    },

    newBookmark: async (newBookmarkDetails) => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        await Bookmark.sync();

        const newBookmarkData = await Bookmark.create(
            {
                userId: newBookmarkDetails.userId,
                recipeId: newBookmarkDetails.recipeId,
            }
        );

        result.data = newBookmarkData;
        result.status = 200;
        result.message = `New Bookmark created!`;
        return result;
 
    }

}