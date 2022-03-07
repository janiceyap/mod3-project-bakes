const bookmarkService = require('../services/bookmark.services')
   
class bookmarkController {

    async showAll(req, res, next) {

        console.log("Showing all bookmarks")

        const result = await bookmarkService.showAll(req.body);
        res.status(result.status);

        return res.json({data: result.data, message: result.message});
    }

    async newBookmark(req, res, next) {

        console.log("Creating new bookmark")
        const result = await bookmarkService.newBookmark(req.body);

        res.status(result.status);

        return res.json({data: result.data, message: result.message});


    }

}

module.exports = bookmarkController;
