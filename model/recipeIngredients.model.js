const {DataTypes, Model} = require('sequelize');

module.exports = function(sequelize) {
    class RecipeIngredients extends Model{};

    RecipeIngredients.init(
        {
            ingredientId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, //Shld this be true or removed?
                allowNull: false,
                field: 'ingredient_id',
            },

            createdAt:{
                type: DataTypes.DATE,
                allowNull: true,
                field:'created_at',               
            },
    
            updatedAt:{
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at',
            },

        },
        {
            sequelize,
            tableName: 'recipe_ingredients',
            modelName: 'RecipeIngredients',
        }    
    );

    return RecipeIngredients;
};