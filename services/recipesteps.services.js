const {DataTypes, Model} = require('sequelize');

module.exports = function(sequelize) { 
    class RecipeSteps extends Model{}; //Why Model not green color?

    RecipeSteps.init(
        {
            stepsId:{
                type: DataTypes.INTEGER, //Cfm DataTypes is called?
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'steps_id',
            },

            recipeId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'recipe_id',
            },

            createdAt:{
                type: DataTypes.DATE,
                field:'created_at',    
                allowNull: true,           
            },
    
            updatedAt:{
                type: DataTypes.DATE,
                field: 'updated_at',
                allowNull: true,
            },
        },
        {
        sequelize,
        tableName: 'recipe_steps',
        modelName: 'RecipeSteps',
        }
    );

    return RecipeSteps;
};