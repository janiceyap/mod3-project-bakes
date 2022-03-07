const {DataTypes, Model} = require ('sequelize');

module.exports = function (sequelize){
    class RecipeEquipment extends Model{}

    RecipeEquipment.init(
        {
            id: {
                type: Datatypes.INTERGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'equipment_id'
            },
            recipeId: {
                type: Datatypes.INTERGER,
                allowNull: false,
                field: 'recipe_id'
            },
            equipmentName: {
                type: Datatypes.CHAR(50),
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