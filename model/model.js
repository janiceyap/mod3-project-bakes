// Import sequelize
const { Sequelize } = require("sequelize");


// DB Connection Configuration... the 1st 3 arguments are "databaseName", "Username", "password"
const sequelize = new Sequelize("project-bake", "postgres", "psqlpw", {
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
};



// Import model(s)
// Janice
const User = require("./user.model")(sequelize);
const FollowChef = require("./followchef.model")(sequelize);



// JianNan
const Recipe= require('./recipe.model')(sequelize);
const RecipeRating = require('./recipeRating.model')(sequelize);
const RecipePic = require('./recipePic.model')(sequelize);


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












//sync DataBase model to model set-up in app

async function syncDatabase(){
  await User.sync({alter:true}).then(()=>{
    console.log(`user table successfully updated`);
  }).catch(err=>{
    console.log('Error updating user table:', err);
  });

  await FollowChef.sync({alter:true}).then(()=>{
    console.log(`follow_chef table successfully updated`);
  }).catch(err=>{
    console.log('Error updating follow_chef table:', err);
  });

  await Recipe.sync({alter:true}).then(()=>{
    console.log(`recipe table successfully updated`);
  }).catch(err=>{
    console.log('Error updating recipe table:', err);
  });

  await RecipePic.sync({alter:true}).then(()=>{
    console.log(`recipe_pic table successfully updated`);
  }).catch(err=>{
    console.log('Error updating recipe_pic table:', err);
  });

  await RecipeRating.sync({alter:true}).then(()=>{
    console.log(`recipe_rating table successfully updated`);
  }).catch(err=>{
    console.log('Error updating recipe_rating table:', err);
  });
}


// Exports (remember enhanced object literal)
module.exports = {
  sequelize,
  testConnection,
  User,
  FollowChef,
  syncDatabase,
  Recipe,
  RecipePic,
  RecipeRating,
};