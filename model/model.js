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
const RecipeSteps = require('./recipesteps.model')(sequelize);
const RecipeIngredients = require('./recipeingredients.model')(sequelize);
const RecipeView = require('./recipeview.model')(sequelize);


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












// Exports (remember enhanced object literal)
module.exports = {
  sequelize,
  testConnection,
  Vehicle,
  Driver










  
};