const {RecipeTags} = require('../../model/model');
jest.mock("../../model/model");
const testCode = require('../recipeTags.service');

const data = {
    recipeId: 1
};

describe(`Test for creating new Recipe Tag.`, () => {

    test(`Test 1: It should call RecipeTagsCreate once`, async () => {
        RecipeTags.create = jest.fn();

        const results = await testCode.newRecipeTags(data);

        expect(RecipeTags.create).toBeCalled();
    });
    test(`Test 2: It should call error if there is error`, async () => {
        RecipeTags.create = jest.fn().mockRejectedValue(new Error('Desired error message'));

        const results = await testCode.newRecipeTags(data);

        expect(results.status).toBe(500);
    });
    test(`Test 3: It should return result 200 when creation is successful`, async () => {
        RecipeTags.create = jest.fn().mockResolvedValue({"tagName": "blue"});

        const results = await testCode.newRecipeTags(data);

        expect(results.status).toBe(200);     

    })
});