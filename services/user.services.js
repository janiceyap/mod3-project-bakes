const { User, FollowChef } = require( "../model/model" );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
require('dotenv').config()
const saltRounds = 10;
let passwordHash = "";

module.exports = {

    register: async (newUserDetails) => {

        await User.sync(); // will create new table if table doesn't exist, otherwise does nth.

        let result = {
            message: null,
            status: null,
            data: null
        }

        // Check if user is already registered in the system under email address.
        const user = await User.findAll({ where: { email: newUserDetails.email } });
        if ( user.length != 0 ){
            result.message = `Email address ${newUserDetails.email} already in use`;
            result.status = 404;
            return result;
        }

        // Generate hashed password to store in database
        try {
            passwordHash = bcrypt.hashSync(newUserDetails.pwd, saltRounds);
        } catch(err){
            console.log(err);
            result.status = 500;
            result.message = "User Creation fail. Please try again.";
            return result;
        }

        // Handling imageUrl for storage -- park a value for now
        let imageUrl = "imageUrl";

        const newUser = await User.create(
            {
                name: newUserDetails.name,
                email: newUserDetails.email, 
                hashedPwd: passwordHash,
                role: newUserDetails.role,
                profilePic: imageUrl,
                noOfFollows: 0
            }
        );

        result.data = newUser;
        result.status = 200;
        result.message = `New Account Registered Successfully.`;
        return result;
    },

    showAll: async () => {
        let result = {
            message: null,
            status: null,
            data: null
        }

        const data = await User.findAll(); // looking for all the users.

        result.message = "Data fetched successfully from database.";
        result.status = 200;   
        result.data = data;

        return result;
    },

    deleteUser: async (userId) => {

        // allow user to delete their own account via a delete button on the 
        // user profile page. The account id (or primary key) would be available. 

        let result = {
            message: null,
            status: null,
            data: null
        }

        // Check if user is already registered in the system under email address.
        const user = await User.findByPk(userId);
        if (!user){
            result.message = `User does not exist.`;
            result.status = 404;
            return result;
        }

        await user.destroy();
        result.status = 200;
        result.message = `User ID ${userId} deleted successfully`;
        return result;
    },

    login: async (email, password) => {

        let result = {
            message: null,
            status: null,
            jwt: null
        }

        let match = false;

        if (!email || !password){
            result.message = `Missing email or password in input.`;
            result.status = 404;
            return result;
        }

        // Look for the email in the database
        const login = await User.findAll({
            where: {
                email : email
            },
        });

        // check if email is already registered
        if ( login.length == 0 ){
            result.message = `Email: ${email} is not registered.`
            result.status = 404;
            return result;
        }

        match = await bcrypt.compare(password, login[0].hashedPwd);

        if (!match) {
            result.message = `Login Failed. Please check password.`;
            result.status = 404;
            return result;
        }

        // Generate JWToken here.

        const loginData = {
            id: login[0].id,
            email: login[0].email
        };

        const token = jwt.sign(loginData, process.env.JWT_SECRET_KEY);
        result.jwt = token;

        result.message = `Login Success!`;
        result.status = 200;
        return result;        
    }
}