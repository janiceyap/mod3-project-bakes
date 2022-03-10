const { User, FollowChef } = require( "../../model/model" );
const testCode = require('../user.services');

afterEach(()=>{
    jest.clearAllMocks();
})

const followData = {
    chefId: 2,
    followerId: 1,
    save:jest.fn(),
    destroy:jest.fn()
};

const sampleUser = {
    name : "justin",
    email : "justin@gmail.com", 
    hashedPwd: "somegibberishhash",
    role : "member",
    profilePic : "imageUrl",
    noOfFollows: 0,
    save:jest.fn(),
    destroy:jest.fn()
};

let oldNoOfFollows = sampleUser.noOfFollows;

describe(`Test for Follow Method`, () => {

    test(`Test 1.1: It should return status 404 and error message if already followed`, async () => {
        User.findByPk = jest.fn().mockReturnValue(sampleUser);
        FollowChef.findAll = jest.fn().mockReturnValue(followData);
        const results = await testCode.followUser(followData.chefId, followData.followerId);
        expect(results.status).toBe(404);
        expect(results.message).toBe(`Already followed.`);
    })

    test(`Test 1.2: If not followed, it should (1)create a new follow, (2)return status 200 and (3)increase noOfFollows by 1 for chefId`, async () => {
        oldNoOfFollows = sampleUser.noOfFollows;
        User.findByPk = jest.fn().mockReturnValue(sampleUser);
        FollowChef.findAll = jest.fn().mockReturnValue([]);
        FollowChef.create = jest.fn();
        const results = await testCode.followUser(followData.chefId, followData.followerId);
        expect(FollowChef.create).toBeCalled();
        expect(results.status).toBe(200);
        expect(results.data.noOfFollows).toBe(oldNoOfFollows+1);
    })
})

describe(`Test for Unfollow Method`, () => {

    test(`Test 2.1: It should return status 404 and error message if not yet followed`, async () => {
        User.findByPk = jest.fn().mockReturnValue(sampleUser);
        FollowChef.findAll = jest.fn().mockReturnValue([]);
        const results = await testCode.unfollowUser(followData.chefId, followData.followerId);
        expect(results.status).toBe(404);
        expect(results.message).toBe(`User did not follow this chef yet.`);
    })

    test(`Test 2.2: If already followed, it should (1)destroy the follow item, (2)return status 200 and (3)decrease noOfFollows by 1 for chefId`, async () => {
        oldNoOfFollows = sampleUser.noOfFollows;
        User.findByPk = jest.fn().mockReturnValue(sampleUser);
        FollowChef.findAll = jest.fn().mockReturnValue([followData]);
        FollowChef.findByPk = jest.fn().mockReturnValue(followData);
        const results = await testCode.unfollowUser(followData.chefId, followData.followerId);
        expect(followData.destroy).toBeCalled();
        expect(results.status).toBe(200);
        expect(results.data.noOfFollows).toBe(oldNoOfFollows-1);
    })
})