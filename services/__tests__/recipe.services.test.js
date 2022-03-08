let { Recipe } = require('../../model/model');
const testCode = require('../recipe.services');

const data = {
    recipeName:"Chicken Rice",
    description:"Cluck, cluck",
    servings:'5',
    prepTimeInMin: '60',
    difficultyLevel: "intermediate",
};

const user = {
    id: 4,
    email:'BatMan@arkham.com',
};



describe(`Test for createNew Method`,()=>{

    test('Test 1: It should call Recipe.create once', async ()=>{
        Recipe.create = jest.fn();

        const results = await testCode.createNew(data, user);

        expect(Recipe.create).toBeCalled();

    })

    test("Test 2: It should return a results object with status 200 if creation is successful",async ()=>{

        Recipe.create=jest.fn().mockResolvedValue({
            recipeId:3,
            userId: user.id,
            recipeName: data.recipeName,
            description: data.description,
            servings: parseInt(data.servings),
            prepTimeInMin: parseInt(data.prepTimeInMin),
            difficultyLevel: data.difficultyLevel.toUpperCase(),
            onSale: false,
            createdOn: new Date(Date.now()),
            updatedOn: new Date(Date.now()),
        });


        const results = await testCode.createNew(data, user);
        
        expect(results.status).toBe(200);

    })

    test("Test 3: It should return a results object with status 500 if creation not successful",async ()=>{

        Recipe.create=jest.fn().mockRejectedValue(
            new Error('Database error')
        );


        const results = await testCode.createNew(data, user);
        
        expect(results.status).toBe(500);

    })
})