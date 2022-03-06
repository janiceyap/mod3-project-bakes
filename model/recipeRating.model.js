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
        },

        recipeId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'reviewed_user_id',
        },

        starRating:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'start_rating',
        },

        comments:{
            type: DataTypes.CHAR(500),
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