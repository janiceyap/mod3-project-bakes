const { DataTypes, Model } = require("sequelize");

module.exports = function (sequelize) {
  class FollowChef extends Model {}

  FollowChef.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        chefId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:"chef_id"
        },
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:"follower_id"
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
      modelName: "FollowChef",
      tableName: "followchef",
    }
  );

  return FollowChef;
};