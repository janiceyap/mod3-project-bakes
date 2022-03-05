// Import sequelize
const { Sequelize, DataTypes } = require("sequelize");


// DB Connection Configuration... the 1st 3 arguments are "databaseName", "Username", "password"
const sequelize = new Sequelize("socialbakes", "student", "student", {
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





//Michelle





// Norman





// Manuspon
const PurchaseHistories = require("./purchasehistories.model")(sequelize);
const Bookmark = require("./bookmark.model")(sequelize);




// Create associations
// Janice
User.hasMany(FollowChef, {
  foreignKey:"chefId",
});

User.hasMany(FollowChef, {
  foreignKey:"followerId",
});



// JianNan












//Michelle












// Norman












// Manuspon
PurchaseHistories.belongsTo(User, {
  foreignKey: "userId"
})
// PurchaseHistories.hasMany(Receipe, {
//   foreignKey: "recipeId"
// })

Bookmark.belongsTo(User, {
  foreignKey: "userId"
})









// Exports (remember enhanced object literal)
module.exports = {
  sequelize,
  testConnection,
  User,
  FollowChef,
  PurchaseHistories,
  Bookmark










  
};