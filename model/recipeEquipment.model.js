const {DataTypes, Model} = require ('sequelize');

module.exports = function (sequelize){
    class RecipeEquipment extends Model{}

    RecipeEquipment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'equipment_id'
            },
            recipeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'recipe_id'
            },
            equipmentName: {
                type: DataTypes.CHAR(50),
                allowNull: false,
                field: 'equipment_name'                

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
            modelName: 'Equipment',
            tableName: 'Tags'
        }        
    );
    return RecipeEquipment;
}