const {DataTypes, Model} = require ('sequelize');

module.exports = function (sequelize){
    class RecipeTags extends Model{}

    RecipeTags.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'tag_id'
            },
            recipeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'recipe_id'
            },
            tagName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: 'tag_name'                

            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
              },
              updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at',
              },
        },
        {
            sequelize,           
            tableName: 'tags',
            modelName: 'RecipeTags',
        }        
    );
    return RecipeTags;
}