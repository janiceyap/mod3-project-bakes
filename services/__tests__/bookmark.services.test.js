const { Bookmark, Recipe } = require( "../../model/model");
jest.mock("../../model/model");
const testCode = require("../bookmark.services");

afterEach(() => {
    jest.clearAllMocks();
  });

const data = {
    //userId: 7,
    recipeId: 10
};
const user = 7


describe(`Test for Bookmark`, () => {

    test (`Test 1: It should return error status 400, if no bookmark found `, async() => {
        Bookmark.findAll = jest.fn().mockReturnValue([]);
        const result = await testCode.showAll(user,data);
        expect (result.status).toBe(400);
    })

    test (`Test 2: It should return error status 400, if duplicate entry found`, async () => {
        Bookmark.findAll = jest.fn().mockReturnValue(data,user);
        const result = await testCode.newBookmark(data,user);
        expect (result.status).toBe(400);
    })

    test (`Test 3: It should return status 200, if new Bookmark added successfully`, async () => {
        Bookmark.findAll = jest.fn().mockReturnValue([]);
        Bookmark.create = jest.fn().mockReturnValue(data,user);
        Recipe.findByPk = jest.fn().mockReturnValue(data.recipeId);
        const result = await testCode.newBookmark(data,user);
        expect (result.status).toBe(200);
    })

})

