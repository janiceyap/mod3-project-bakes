const {DataTypes, Model} = require('sequelize');

module.exports = function(sequelize) { 
    class RecipeSteps extends Model {} //Why Model not green color? Need ; at the end of {}?

    RecipeSteps.init(
        { //Do i still need Id when I have stepsId and recipeId?
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
            tableName: 'recipe_steps',
            modelName: 'RecipeSteps',
        }
    );

    return RecipeSteps;
};