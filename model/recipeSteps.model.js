const {DataTypes, Model} = require('sequelize');

module.exports = function(sequelize) { 
    class RecipeSteps extends Model {};

    RecipeSteps.init(
        { 
            stepsId:{
                type: DataTypes.INTEGER,
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

            stepsNo:{
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
                field: 'steps_no',
            },

            features:{
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
                field: 'features',
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