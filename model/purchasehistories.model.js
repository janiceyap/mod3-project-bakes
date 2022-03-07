const { DataTypes, Model } = require("sequelize");

module.exports = function (sequelize) {
    class PurchaseHistories extends Model {}

    PurchaseHistories.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'purchase_id',
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
            purchaseDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'purchase_date'
            },
            subtotal: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
                field: 'subtotal'
            },
            gst: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
                field: 'gst'
            },
            total: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
                field: 'total'
            },
            paymentMethod : {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: 'payment_method'
            },
            paymentTxnId : {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: 'payment_txn_id'
            },
            invoiceId : {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: 'invoice_id',
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
            modelName: "PurchaseHistories",
            tableName: "purchase_histories"
        }
    );

    return PurchaseHistories;
};