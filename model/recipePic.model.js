const {DataTypes, Model} = require('sequelize');

module.exports= function(sequelize){
    class RecipePic extends Model{};

    RecipePic.init({
        pictureId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            field: 'picture_id',
        },

        pictureURL:{
            type:DataTypes.STRING(2048),
            unique:true,
            allowNull:false,
            field:'picture_url',
        },

        pictureDescr:{
            type:DataTypes.STRING(100),
            allowNull: false,
            field:'picture_descr',
        },

        recipeId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            field: 'recipe_id',
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
        tableName: 'recipe_pic',
        modelName: 'RecipePic',
    });

    return RecipePic;
}
