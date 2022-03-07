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
                field: 'purchase_date',
                validate: {
                isAfter: "2022-03-01",
                isBefore: "2022-12-31",
                }
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
                field: 'payment_method',
                validate: {
                    isIn: {
                    args: [['VISA','MASTERCARD']],
                    msg: 'ACCEPT ONLY VISA OR MASTERCARD',
                    }
                }
            },
            paymentTxnId : {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: 'payment_txn_id',
                validate: {
                    len: [12,18],
                    isAlphanumeric: true,
                    isUppercase: true,
                }
            },
            invoiceId : {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: 'invoice_id',
                validate: {
                    customValidator(value) {
                        if (!value.startsWith('SB') ) {
                          throw new Error("Invoice needs to start with 'SB' ");
                        }
                    },
                    isAlphanumeric: true,
                    isUppercase: true,
                    len: [6,8],  
                }
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