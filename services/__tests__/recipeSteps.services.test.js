const {RecipeSteps} = require('../../model/model');
const testCode = require('../recipeSteps.services');

const data = {
    recipeId: 1
};

const newRecipeSteps = [
    "Whisk"
];

describe(`Test for creating new Recipe Steps Method.`, () => {

    test(`Test 1: It should call RecipeSteps.create once`, async () => {

        RecipeSteps.create = jest.fn();

        const results = await testCode.newRecipeSteps(data.recipeId, newRecipeSteps);

        expect(RecipeSteps.create).toBeCalled();
    });

    test(`Test 2: Return an array of strings with status 200 if successfull.`, async () => {

        RecipeSteps.create = jest.fn().mockReturnValue(newRecipeSteps);

        const results = await testCode.newRecipeSteps(data.recipeId, newRecipeSteps);

        expect(results.status).toBe(200);
        expect(results.data).toBe(newRecipeSteps);
    });

    test(`Test 3: It should return an error with status 500 if unsucessful.`, async () => {

        RecipeSteps.create = jest.fn().mockRejectedValue(
            new Error(`Database error.`)
        );

        const results = await testCode.newRecipeSteps(data.recipeId, newRecipeSteps);

        expect(results.status).toBe(500);
        expect(results.message).toBe(`Database error.`);
    });
});