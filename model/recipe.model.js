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
                type: DataTypes.STRING(100),
                allowNull:false,
                field: 'recipe_name',
            },

            description:{
                type: DataTypes.STRING(500),
                allowNull:false,
            },

            difficultyLevel:{
                type: DataTypes.STRING(15),
                allowNull:false,
                field: 'difficulty_level',
                validate:{
                    isIn: {
                        args: [['EASY', 'INTERMEDIATE', 'HARD']],
                        msg: 'Input must be "EASY", "INTERMEDIATE" or "HARD"'
                      }
                },
                set(value){
                    this.setDataValue('difficultyLevel', value.toUpperCase())
                },
            },

            servings:{
                type: DataTypes.INTEGER,
                allowNull:false,
                set(value){
                    this.setDataValue('servings', parseInt(value))
                },
            },

            prepTimeInMin:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'recipe_time_in_minutes',
                set(value){
                    this.setDataValue('prepTimeInMin', parseInt(value))
                },
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
                set(value){
                    if (value===true || value ===false){
                        this.setDataValue('onSale', value);
                    }else{
                        switch(value.toLowerCase()){
                            case("1"):
                            case(1):
                            case('true'):
                                this.setDataValue('onSale',true);
                                break;

                            case("0"):
                            case(0):
                            case('false'):
                                this.setDataValue('onSale',false);
                                break;
                            default:
                                this.setDataValue('onSale',value);
                        }
                    }
                },
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
