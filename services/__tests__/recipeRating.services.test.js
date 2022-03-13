const { update } = require("lodash");
const { user } = require("pg/lib/defaults");
const { Recipe, RecipeRating, PurchaseHistories } = require("../../model/model");
jest.mock("../../model/model");
const recipeRatingModel = require("../../model/recipeRating.model");

const testCode = require('../recipeRating.services');


afterEach(()=>{
    jest.clearAllMocks()
})

describe('Test for createNew method', ()=>{
    test(`Test 1: It should not create new ratings if user has not purchased the recipe`, async()=>{
        RecipeRating.create=jest.fn();
        PurchaseHistories.findOne = jest.fn().mockResolvedValue(null);
        RecipeRating.findOne=jest.fn().mockResolvedValue(null);
        let recipeId= 2;
        let user = {
            id:3,
            email:'test@test.com',
            role:'user',
        };
        let ratings = {
            starRating:'4',
            comments:'Clear instructions, easy to follow! Result is delicious!'
        }

        let results = await testCode.createNew(recipeId, user, ratings);

        expect(RecipeRating.create).not.toBeCalled();
        expect(results.status).toBe(401);
        expect(results.message).toBe(`User not authorized to leave a rating without a purchase.`);
    });

    test(`Test 2: It should not create new ratings if user has already left a rating`, async()=>{
        RecipeRating.create=jest.fn();
        PurchaseHistories.findOne = jest.fn().mockResolvedValue({
            id: 3,
            userId: 2,
            recipeId: 3,
            purchaseDate: new Date(Date.now),
            subtotal: 30,
            gst: 2.1,
            total: 32.1,
            paymentMethod : 'VISA',
            paymentTxnId : '12345terwe',
            invoiceId : '4123ggfd',
            createdAt: new Date(Date.now),
            updatedAt: new Date(Date.now),
        });
        RecipeRating.findOne = jest.fn().mockResolvedValue({
            reviewId:1,
            reviewerUserId: 2,
            recipeId: 3,
            starRating: 4,
            comments:'Clear instructions, easy to follow! Result is delicious!',
            createdAt: new Date(Date.now),
            updatedAt: new Date(Date.now),
        });
        let recipeId=3;
        let user = {
            id:2,
            email:'test@test.com',
            role:'user',
        };
        let ratings = {
            starRating:'4',
            comments:'Clear instructions, easy to follow! Result is delicious!'
        }

        console.log(testCode);

        let results = await testCode.createNew(recipeId, user, ratings);

        expect(RecipeRating.create).not.toBeCalled();
        expect(results.status).toBe(400);
        expect(results.message).toBe(`Rating left for this recipe.`);
    });

    test('Test3: It should return an object with status 200 if creation of rating in rating table, and update of the average star rating in the recipe table is sucessful',async ()=>{
        let recipeId=3;
        let user = {
            id:2,
            email:'test@test.com',
            role:'user',
        };
        let ratings = {
            starRating:'5',
            comments:'Clear instructions, easy to follow! Result is delicious!'
        };
        RecipeRating.create=jest.fn().mockResolvedValue({
            id:1,
            recipeId,
            reviewerUserId: user.id,
            starRating: ratings.starRating,
            comments:ratings.comments,
            createdAt: new Date(Date.now),
            updatedAt: new Date(Date.now),
        });
        Recipe.findByPk = jest.fn().mockResolvedValue({
            recipeId:3,
            userId: 3,
            recipeName: 'chicken rice',
            description: 'Cluck, cluck, cluck',
            servings: 10,
            prepTimeInMin: 60,
            difficultyLevel: 'HARD',
            starRating:5.0,
            onSale: true,
            createdOn: new Date(Date.now()),
            updatedOn: new Date(Date.now()),
            save:jest.fn(),
            update:jest.fn()
        });
        RecipeRating.findAll = jest.fn().mockResolvedValue([{
            reviewId:1,
            reviewerUserId: 2,
            recipeId: 3,
            starRating: 4,
            comments:'Clear instructions, easy to follow! Result is delicious!',
            createdAt: new Date(Date.now),
            updatedAt: new Date(Date.now),
        }]);
        PurchaseHistories.findOne = jest.fn().mockResolvedValue({
            id: 3,
            userId: 2,
            recipeId: 3,
            purchaseDate: new Date(Date.now),
            subtotal: 30,
            gst: 2.1,
            total: 32.1,
            paymentMethod : 'VISA',
            paymentTxnId : '12345terwe',
            invoiceId : '4123ggfd',
            createdAt: new Date(Date.now),
            updatedAt: new Date(Date.now),
        });
        RecipeRating.findOne = jest.fn().mockResolvedValue(null);

        let results = await testCode.createNew(recipeId, user, ratings);

        expect(RecipeRating.create).toBeCalled();
        expect(results.status).toBe(200);
        expect(results.data.recipe.starRating).toBeCloseTo(4.5,5);

    })


})