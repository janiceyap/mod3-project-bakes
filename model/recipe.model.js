const {DataTypes, Model} = require('sequelize');


module.exports = function (sequelize){
    class Recipe extends Model{};

    Recipe.init(
        {
            recipeId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement:true,
                field:'recipe_id',
            },

            userId:{
                type:DataTypes.INTEGER,
                allowNull:false,
                field: 'user_id',
            },

            recipeName:{
                type: DataTypes.CHAR(100),
                allowNull:false,
                field: 'recipe_name',
            },

            description:{
                type: DataTypes.CHAR(500),
                allowNull:false,
            },

            difficultyLevel:{
                type: DataTypes.CHAR(15),
                allowNull:false,
                field: 'difficulty_level',
                validate:{
                    isIn: {
                        args: [['EASY', 'INTERMEDIATE', 'HARD']],
                        msg: 'Input must be "EASY", "INTERMEDIATE" or "HARD"'
                      }
                }
            },

            servings:{
                type: DataTypes.CHAR(20),
                allowNull:false,
            },

            prepTimeInMin:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'recipe_time_in_minutes'
            },

            starRating:{
                type:DataTypes.FLOAT,
                allowNull:false,
                defaultValue: 0,
                field: 'star_rating',
            },
            
            onSale:{
                type:DataTypes.BOOLEAN,
                allowNull:false,
                defaultValue:false,
                field:'on_sale',
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


    },{
        sequelize,
        tableName:'recipe',
        modelName:'Recipe',
    });

    return Recipe;


}
