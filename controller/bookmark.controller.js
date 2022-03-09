const bookmarkService = require('../services/bookmark.services')
   
class bookmarkController {

    async showAll(req, res, next) {

        const result = await bookmarkService.showAll(req.params.userId);

        res.status(result.status);

        return res.json({message: result.message, data: result.data});
    }

    async newBookmark(req, res, next) {

        const result = await bookmarkService.newBookmark(req.params.userId,req.body.recipeId);

        res.status(result.status);

        return res.json({message: result.message, data: result.data});
    }
    
    async deleteBookmark (req, res, next) {

        const result = await bookmarkService.deleteBookmark(req.params.userId,req.body.recipeId); 

        res.status(result.status);

        return res.json({message: result.message, data: result.data});
    }
}

module.exports = bookmarkController;
