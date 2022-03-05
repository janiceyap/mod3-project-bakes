const { User, FollowChef } = require( "../model/model" );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
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
    }
}