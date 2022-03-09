const {RecipeSteps} = require('../../model/model');
const testCode = require('../recipeSteps.services');

const data = {
    recipeId: 1
};

describe(`Test for creating new Recipe Steps Method.`, () => {

    test(`Test 1: It should call newRecipeSteps once`, async () => {

        const results = await testCode.newRecipeSteps(data);

        expect(RecipeSteps.create).toBeCalled();
    });

    test(`Test 2: Return an array of strings with status 200 if successfull.`, async () => {

        const results = await testCode.newRecipeSteps(data);

        expect(results.status).toBe(200);
    })
});