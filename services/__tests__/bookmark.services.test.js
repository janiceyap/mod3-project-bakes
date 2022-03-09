const { Bookmark } = require( "../../model/model");
const testCode = require("../bookmark.services");

const data = {
    userId: 7,
    recipeId: 10
};


describe(`Test for Bookmark`, () => {

    test (`Test 1: It should return error status 400, if no bookmark found `, async() => {
        Bookmark.findAll = jest.fn().mockReturnValue([]);
        const result = await testCode.showAll(data.userId,data.recipeId);
        expect (result.status).toBe(400);
    })

    test (`Test 2: It should return error status 400, if duplicate entry found`, async () => {
        Bookmark.findAll = jest.fn().mockReturnValue(data);
        const result = await testCode.newBookmark(data);
        expect (result.status).toBe(400);
    })

})

