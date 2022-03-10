const {DataTypes, Model} = require('sequelize');

module.exports= function(sequelize){
    class RecipeRating extends Model{};

    RecipeRating.init({
        reviewId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'review_id',
        },

        reviewerUserId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'reviewer_user_id',
            set(value){
                this.setDataValue('reviewerUserId', parseInt(value))
            },
        },

        recipeId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'recipe_id',
        },

        starRating:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'start_rating',
            validate:{
                isBtwZeroAndFive(value){
                    if (isNaN(value) || value<0 || value>5){
                        throw new Error('Rating value must be an integer between 0 to 5');
                    }
                }
            },
            set(value){
                this.setDataValue('starRating', parseInt(value))
            },
        },

        comments:{
            type: DataTypes.STRING(500),
            allowNull: true,
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
        tableName: 'recipe_rating',
        modelName: 'RecipeRating',
    });

    return RecipeRating;
}