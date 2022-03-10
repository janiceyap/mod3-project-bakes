const { User } = require( "../../model/model" );
const testCode = require('../user.services');
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

afterEach(()=>{
    jest.clearAllMocks();
})

const loginData = {
    email: "testinghard@gmail.com",
    pwd: "securepassword"
}


describe(`Test for Login Method`, () => {

    test(`Test 1.1: It should return status 404 if email is not found`, async () => {
        User.findAll = jest.fn().mockReturnValue([]);
        const results = await testCode.login(loginData.email, loginData.pwd);
        expect(results.status).toBe(404);
    })

    test(`Test 1.2: It should call bcrypt.compare once to check if password matches hash`, async () => {
        User.findAll = jest.fn().mockReturnValue([{hashedPwd:"thisisthehashedpassword"}]);
        bcrypt.compare = jest.fn();
        jwt.sign = jest.fn();
        const results = await testCode.login(loginData.email, loginData.pwd);
        expect(bcrypt.compare).toBeCalled();
    })

    test(`Test 1.3: If password doesn't match hash, status 404 to be returned`, async () => {
        User.findAll = jest.fn().mockReturnValue([{hashedPwd:"thisisthehashedpassword"}]);
        bcrypt.compare = jest.fn().mockReturnValue(false);
        jwt.sign = jest.fn().mockReturnValue('theJWTokenIsGenerated');
        const results = await testCode.login(loginData.email, loginData.pwd);
        expect(results.status).toBe(404);
    })

    test(`Test 1.4: If password matches hash, check that jwtoken is generated and returned`, async () => {
        User.findAll = jest.fn().mockReturnValue([{hashedPwd:"thisisthehashedpassword"}]);
        bcrypt.compare = jest.fn().mockReturnValue(true);
        jwt.sign = jest.fn().mockReturnValue('theJWTokenIsGenerated');
        const results = await testCode.login(loginData.email, loginData.pwd);
        expect(results.jwt).toBe('theJWTokenIsGenerated');
    })
})


