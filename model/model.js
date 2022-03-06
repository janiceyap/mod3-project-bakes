// Import sequelize
const { Sequelize } = require("sequelize");


// DB Connection Configuration... the 1st 3 arguments are "databaseName", "Username", "password"
const sequelize = new Sequelize("project_db", "postgres", "N3NL8bAxAghi", {
  host: "localhost",
  dialect: "postgres",
});

// Test connection function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}

// Import model(s)
// Janice
const User = require("./user.model")(sequelize);
const FollowChef = require("./followchef.model")(sequelize);



// JianNan
const Recipe= require('./recipe.model')(sequelize);
const RecipeRating = require('./recipeRating.model')(sequelize);
const RecipePic = require('./recipePic.model')(sequlize);


//Michelle





// Norman





// Manuspon





// Create associations
// Janice
User.hasMany(FollowChef, {
  foreignKey:"chefId",
});

User.hasMany(FollowChef, {
  foreignKey:"followerId",
});



// JianNan
Recipe.belongsTo(User,{
  foreignKey: 'userId',
});
RecipePic.belongsTo(Recipe,{
  foreignKey:'recipeId',
});
RecipeRating.belongsTo(Recipe,{
  foreignKey:'recipeId',
});
RecipeRating.belongsTo(User,{
  foreignKey:'reviewerUserId',
});
//Michelle












// Norman












// Manuspon












// Exports (remember enhanced object literal)
module.exports = {
  sequelize,
  testConnection,
  User,
  FollowChef










  
};