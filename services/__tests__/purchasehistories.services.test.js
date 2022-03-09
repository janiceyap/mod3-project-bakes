const {PurchaseHistories} = require("../../model/model");
const purchasehistoriesServices = require("../purchasehistories.services");
const testCode = require("../purchasehistories.services");

const data = {
    userId: 7,
    recipeId: 2,
    purchaseDate: "2022-03-31",
    subtotal: 80,
    gst: 5.60,
    total: 85.60,
    paymentTxnId : "BX2323131121",
    paymentMethod: "VISA",
    invoiceId : "SB2434"
};


describe (`Test for Purchase Histories`, () => {

    test(`Test 1: FindbyPk under deletePurchase should be called once`, async() => {
        PurchaseHistories.findByPk = jest.fn();
        const result = await testCode.deletePurchase(data);
        expect(PurchaseHistories.findByPk).toBeCalled();
    })

    test(`Test 2: It should return status 200 if Purchase Creation is successful`, async () => {
        PurchaseHistories.findOne = jest.fn().mockReturnValue();
        PurchaseHistories.create = jest.fn().mockReturnValue(data);
        const result = await testCode.newPurchase(data);
        //console.log("---test 2 result---", result)
        expect(result.status).toBe(200);
        expect(result.data).toBe(data);
    })
    
//add in case when it fails
    // test (`Test 3: It should return error status if Purchase Creation fails`, async () => {
    //     PurchaseHistories.findOne = jest.fn().mockReturnValue();
    //     PurchaseHistories.create = jest.fn().mockRejectedValue();
    //     const result = await testCode.newPurchase(data);
    //     expect(result.status).toBe(500);
    // })

    // test(`Test 2: It should return status 200 if there's user purchase `, async() => {
    //     const result = await testCode.showAll(data.userId);
    //     expect(result.status).toBe(200); 
    // })

    // test(`Test 3: It should return status 400 if new creation fail`, async() => {
    //     PurchaseHistories.create = jest.fn().mockRejectedValue(new Error('Error'));
    //     const result = await testCode.newPurchase(data);
    //     expect(result.status).toBe(500); 
    // })

})