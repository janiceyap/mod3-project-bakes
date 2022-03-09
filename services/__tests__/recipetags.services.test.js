const {RecipeTags} = require('../../model/model');
const testCode = require('../RecipeTags.services');

const data = {
    recipeId: 1
};

describe(`Test for creating new Recipe Tag.`, () => {

    test(`Test 1: It should call newRecipeTags once`, async () => {
        RecipeTags.create = jest.fn()

        const results = await testCode.newRecipeTags(data);

        expect(RecipeTags.create).toBeCalled();
    });
    test(`Test 2: It should call error if its empty`, async () => {
        
    });

});