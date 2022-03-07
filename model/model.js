// Import sequelize
const { Sequelize } = require("sequelize");


// DB Connection Configuration... the 1st 3 arguments are "databaseName", "Username", "password"
const sequelize = new Sequelize("lesson_db", "postgres", "N3NL8bAxAghi", {
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
const Vehicle = require("./vehicle")(sequelize);
const Driver = require("./driver")(sequelize);



// JianNan





//Michelle
const RecipeSteps = require('./recipeSteps.model')(sequelize);
const RecipeIngredients = require('./recipeIngredients.model')(sequelize);
const RecipeView = require('./recipeView.model')(sequelize);


// Norman





// Manuspon





// Create associations
// Janice
Vehicle.belongsTo(Driver, {
    foreignKey:"driverId"
});









// JianNan













//Michelle
RecipeSteps.belongsTo(Recipe, {
  foreignKey: 'recipeId',
});

RecipeIngredients.belongsTo(Recipe, {
  foreignKey: 'recipeId',
});

RecipeView.belongsTo(Recipe, {
  foreignKey: 'recipeId',
});







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
  RecipeSteps,
  RecipeIngredients,
  RecipeView,
};