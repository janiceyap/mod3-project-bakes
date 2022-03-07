const { DataTypes, Model } = require("sequelize");

module.exports = function (sequelize) {
  class User extends Model {}

  User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hashedPwd:{
            type:DataTypes.STRING,
            allowNull: false,
            field:"hashed_pwd"
        },
        role:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        profilePic:{
            type:DataTypes.STRING,
            allowNull: true,
            field:"profile_pic"
        },
        noOfFollows:{
            type:DataTypes.INTEGER,
            allowNull: false,
            field:"no_of_follows"
        },
        createdAt: {
            type: DataTypes.DATE,
            field: "created_at",
            allowNull:true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at",
            allowNull:true,
        },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
    }
  );

  return User;
};