const {DataTypes, Model} =  require("sequelize");

module.exports = function (sequelize) {
    class Bookmark extends Model {}

    Bookmark.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id',
            },
            recipeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'recipe_id',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull:true,
                field: "created_at",
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull:true,
                field: "updated_at",
            },
        },
        {
            sequelize,
            modelName: "Bookmark",
            tableName: "bookmark"
        }
    );

    return Bookmark;
};