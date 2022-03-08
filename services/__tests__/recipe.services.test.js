let { Recipe } = require('../../model/model');
const testCode = require('../recipe.services');
let {Op} = require('sequelize');

afterEach(()=>{
    jest.clearAllMocks();
})


describe(`Test for createNew Method`,()=>{

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

    beforeEach(()=>{
        Recipe.create=jest.fn().mockResolvedValue({
            recipeId:3,
            userId: user.id,
            recipeName: data.recipeName,
            description: data.description,
            servings: parseInt(data.servings),
            prepTimeInMin: parseInt(data.prepTimeInMin),
            difficultyLevel: data.difficultyLevel.toUpperCase(),
            starRating:0,
            onSale: false,
            createdOn: new Date(Date.now()),
            updatedOn: new Date(Date.now()),
        });

    })

    test('Test 1: It should call Recipe.create once', async ()=>{

        const results = await testCode.createNew(data, user);

        expect(Recipe.create).toBeCalled();

    })

    test("Test 2: It should return a results object with status 200 if creation is successful",async ()=>{


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
});


describe(`Test for searchGeneralInfo Method`,()=>{

    beforeEach(()=>{
        Recipe.findAll = jest.fn();
        Op.gte = jest.fn();
        Op.lte = jest.fn();
        Op.eq = jest.fn();
        Op.or = jest.fn();
    })


    test('Test 1: With keyword Chicken, it should search recipeName and Description with values like chicken and onSAle = true', async ()=>{

        const results = await testCode.searchGeneralInfo({keyWord:'Chicken'});

        expect(Recipe.findAll).toBeCalledWith({
            where:{
                [Op.or]:[
                    {'recipeName':{[Op.iLike]:'%Chicken%'}},
                    {'description':{[Op.iLike]:'%Chicken%'}}
                ],
                onSale:true,
            }
        });

    });

    test("Test 2: It should search based on prep time, min and max, when provided in the search params ",async ()=>{

        const results = await testCode.searchGeneralInfo({maxPrepTimeInMin:'60', minPrepTimeInMin:'30', prepTimeInMin:'45'});

        expect(Recipe.findAll).toBeCalledWith({
            where:{
                prepTimeInMin:{[Op.lte]:60},
                prepTimeInMin:{[Op.gte]:30},
                prepTimeInMin:{[Op.eq]:45},
                onSale:true,
            }});

    });

    
    test("Test 3: It should search based on starRating, min and max, when providedin the search params ", async ()=>{

        const results = await testCode.searchGeneralInfo({maxStarRating:'5', minStarRating:'1', starRating:4});

        expect(Recipe.findAll).toBeCalledWith({
            where:{
                starRating:{[Op.lte]:5},
                starRating:{[Op.gte]:1},
                starRating:{[Op.eq]:4},
                onSale:true,
            }});

    });

    test("Test 4: It should search based on servings, min and max, when provided in the search params ", async ()=>{

        const results = await testCode.searchGeneralInfo({maxServings:'10', minServings:'5', servings: 8});

        expect(Recipe.findAll).toBeCalledWith({
            where:{
                servings:{[Op.lte]:10},
                servings:{[Op.gte]:5},
                servings:{[Op.eq]:8},
                onSale:true,
            }});

    });

    test("Test 5: It should search based on difficultyLevel when provided in the search params ", async ()=>{

        const results = await testCode.searchGeneralInfo({difficultyLevel:'easy'});

        expect(Recipe.findAll).toBeCalledWith({
            where:{
                difficultyLevel:{[Op.eq]:'EASY'},
                onSale:true,
            }});

    });

    test("Test 6: It should search based on recipeId when provided in the search params ", async ()=>{

        const results = await testCode.searchGeneralInfo({difficultyLevel:'easy'});

        expect(Recipe.findAll).toBeCalledWith({
            where:{
                difficultyLevel:{[Op.eq]:'EASY'},
                onSale:true,
            }});

    });

    test("Test 7: It should search based on userId when provided in the search params ", async ()=>{;

        const results = await testCode.searchGeneralInfo({userId:'3'});

        expect(Recipe.findAll).toBeCalledWith({
            where:{
                userId:{[Op.eq]:3},
                onSale:true,
            }});

    });

    test("Test 8: It should search with onSale=true even when provided onSale=false in the search params ", async ()=>{;

        const results = await testCode.searchGeneralInfo({onSale:false});

        expect(Recipe.findAll).toBeCalledWith({
            where:{
                onSale:true,
            }});

    });

    test("Test 9: It should not include random key values, not in the recipe table's column name, in the search function.", async ()=>{;

        const results = await testCode.searchGeneralInfo({randomKey:6});

        expect(Recipe.findAll).toBeCalledWith({
            where:{
                onSale:true,
            }});

    });

    test("Test 10: It should return an object with status property = 200 if search is performed", async ()=>{

        Recipe.findAll = jest.fn().mockResolvedValue({
            recipeId:3,
            userId: 5,
            recipeName: "Chicken Rice",
            description: "Cluck, cluck",
            servings: 5,
            prepTimeInMin: 60,
            difficultyLevel: 'INTERMEDIATE',
            onSale: true,
            createdOn: new Date(Date.now()),
            updatedOn: new Date(Date.now()),});

        const results = await testCode.searchGeneralInfo({randomKey:6});

        expect(results.status).toBe(200);

    });

    test("Test 11: It should return an object with status property = 500 if search fails", async ()=>{;

        Recipe.findAll = jest.fn().mockRejectedValue(new Error('Database error'));

        const results = await testCode.searchGeneralInfo({randomKey:6});

        expect(results.status).toBe(500);

    });
});


describe('Test for updateRecipe Method',()=>{

    let recipeId = 3;
    let data = {
        recipeName: "Chicken Porrigde",
        servings: 6,
        starRating: 5.0,
        randomProperty: 'random value',
    };

    let user = {
        id: 1,
        email:"test@jest.com"
    }

    beforeEach(()=>{

        Recipe.findByPk = jest.fn().mockResolvedValue({
            recipeId:3,
            userId: 1,
            recipeName:"Chicken Rice",
            description:"Cluck, cluck",
            servings:5,
            prepTimeInMin: 60,
            difficultyLevel: "INTERMEDIATE",
            starRating: 2.1,
            onSale: false,
            createdOn: new Date(Date.now()),
            updatedOn: new Date(Date.now()),
            save:jest.fn(),
            reload:jest.fn(),
        })
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })

    

    test("Test 1: It should return a results object with status 401 if user is not the owner of the recipe",async ()=>{


        const results = await testCode.updateRecipe(recipeId, data, {id:2, email:"test@jest.com"});
        
        expect(results.status).toBe(401);
        expect(results.message).toBe('User not authorized to amend data for this recipe.');
        expect(results.data).toBe(null);

    });

    test("Test 2: It should return a results object with status 404 if recipe id not found",async ()=>{

        Recipe.findByPk = jest.fn().mockResolvedValue(null);

        const results = await testCode.updateRecipe(2, data, {id:2, email:"test@jest.com"});
        
        expect(results.status).toBe(404);
        expect(results.message).toBe('Recipe ID not found');
        expect(results.data).toBe(null);

    });

    test("Test 3: It should return a results object with status 200 if recipe id is found with correct userId",async ()=>{

        const results = await testCode.updateRecipe(recipeId, data, user);
       
        expect(results.status).toBe(200);

    });
});

describe('Test for deleteRecipe Method',()=>{

    let recipeId = 3;

    let user = {
        id: 1,
        email:"test@jest.com"
    }

    beforeEach(()=>{

        Recipe.findByPk = jest.fn().mockResolvedValue({
            recipeId:3,
            userId: 1,
            recipeName:"Chicken Rice",
            description:"Cluck, cluck",
            servings:5,
            prepTimeInMin: 60,
            difficultyLevel: "INTERMEDIATE",
            starRating: 2.1,
            onSale: false,
            createdOn: new Date(Date.now()),
            updatedOn: new Date(Date.now()),
            save:jest.fn(),
            reload:jest.fn(),
            destroy:jest.fn(),
        })
    });

    afterEach(()=>{
        jest.clearAllMocks();
    })



    test("Test 1: It should return a results object with status 401 if user is not the owner of the recipe",async ()=>{


        const results = await testCode.deleteRecipe(recipeId, {id:2, email:"test@jest.com"});
        
        expect(results.status).toBe(401);
        expect(results.message).toBe('User not authorized to delete this recipe.');
        expect(results.data).toBe(null);

    });

    test("Test 2: It should return a results object with status 404 if recipe id not found",async ()=>{

        Recipe.findByPk = jest.fn().mockResolvedValue(null);

        const results = await testCode.deleteRecipe(2, {id:2, email:"test@jest.com"});
        
        expect(results.status).toBe(404);
        expect(results.message).toBe('Recipe ID not found');
        expect(results.data).toBe(null);

    });

    test("Test 3: It should return a results object with status 200 if recipe id is found with correct userId",async ()=>{

        const results = await testCode.deleteRecipe(recipeId, user);
        
        expect(results.status).toBe(200);

    });

});