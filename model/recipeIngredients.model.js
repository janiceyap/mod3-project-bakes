const {DataTypes, Model} = require('sequelize');

module.exports = function(sequelize) {
    class RecipeIngredients extends Model{};

    RecipeIngredients.init(
        {
            ingredientId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'ingredient_id',
            },

            recipeId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'recipe_id',
            },

            quantity:{
                type: DataTypes.FLOAT,
                allowNull: false,
                field: 'quantity',
            },

            units:{
                type: DataTypes.STRING(20),
                allowNull: false,
                field: 'units',
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