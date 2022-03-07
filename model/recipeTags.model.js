const {DataTypes, Model} = require ('sequelize');

module.exports = function (sequelize){
    class RecipeTags extends Model{}

    RecipeTags.init(
        {
            id: {
                type: Datatypes.INTERGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'tag_id'
            },
            recipeId: {
                type: Datatypes.INTERGER,
                allowNull: false,
                field: 'recipe_id'
            },
            tagName: {
                type: Datatypes.CHAR(50),
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
            modelName: 'RecipeTags',
            tableName: 'Tags',
        }        
    );
    return RecipeTags;
}