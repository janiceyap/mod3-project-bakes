const {PurchaseHistories} = require("../../model/model")
const testCode = require("../purchasehistories.services");

const data = {
    "userId": 7,
    "recipeId": 2,
    "purchaseDate": "2022-03-31",
    "subtotal": 80,
    "paymentTxnId" : "BX2323131121",
    "paymentMethod": "VISA",
    "invoiceId" : "SB2434"
};

describe (`Test for Purchase Histories`, () => {

    test(`Test 1: FindbyPk under deletePurchase should be called once`, async() => {

        PurchaseHistories.findByPk = jest.fn();
        const result = await testCode.deletePurchase(data);
        expect(PurchaseHistories.findByPk).toBeCalled();
    })
})