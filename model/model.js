// Import sequelize
const { Sequelize } = require("sequelize");
require('dotenv').config()

// DB Connection Configuration... the 1st 3 arguments are "databaseName", "Username", "password"
let sequelize;
if(process.env.DATABASE_URL!== undefined){
 sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else{
  sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD,  {
    host:'localhost',
    dialect:'postgres'
    }
  )};

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
const RecipeSteps = require('./recipeSteps.model')(sequelize);
const RecipeIngredients = require('./recipeIngredients.model')(sequelize);



// Norman
const RecipeTags = require('./recipeTags.model')(sequelize);
const RecipeEquipment = require('./recipeEquipment.model')(sequelize);



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







// Norman
RecipeTags.belongsTo(Recipe,{
  foreignKey: 'recipeId',
});
RecipeEquipment.belongsTo(Recipe,{
  foreignKey: 'recipeId',
});



















//Michelle
RecipeSteps.belongsTo(Recipe, {
  foreignKey: 'recipeId',
});

RecipeIngredients.belongsTo(Recipe, {
  foreignKey: 'recipeId',
});












// Manuspon
PurchaseHistories.belongsTo(User, {
  foreignKey: "userId"
})
Recipe.hasMany(PurchaseHistories, {
  foreignKey: "recipeId"
})

Bookmark.belongsTo(User, {
  foreignKey: "userId"
})

Recipe.hasMany(Bookmark, {
  foreignKey: "recipeId"
})










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

  await PurchaseHistories.sync({alter:true}).then(()=>{
    console.log(`purchase_histories successful updated `)
  }).catch(err=>{
    console.log('Error updating purchase_histories table:', err)
  })
  
  await Bookmark.sync({alter:true}).then(()=>{
    console.log(`bookmark successful updated `)
  }).catch(err=>{
    console.log('Error updating bookmark table:', err)
  })

  await RecipeSteps.sync({alter:true}).then(()=>{
    console.log(`Recipe Steps successfully updated `)
  }).catch(err=>{
    console.log('Error updating recipe steps:', err)
  })

  await RecipeIngredients.sync({alter:true}).then(()=>{
    console.log(`Recipe Ingredients successfully updated `)
  }).catch(err=>{
    console.log('Error updating recipe ingredients:', err)
  })

  await RecipeTags.sync({alter:true}).then(()=>{
    console.log(`Recipe Tags successfully updated `)
  }).catch(err=>{
    console.log('Error updating recipe steps:', err)
  })
};





// Exports (remember enhanced object literal)
module.exports = {
  sequelize,
  testConnection,
  User,
  FollowChef,
  PurchaseHistories,
  Bookmark,
  syncDatabase,
  Recipe,
  RecipePic,
  RecipeRating,
  RecipeSteps,
  RecipeIngredients,
  RecipeTags
};