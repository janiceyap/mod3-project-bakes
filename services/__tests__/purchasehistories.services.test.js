const {PurchaseHistories, User} = require("../../model/model");
jest.mock("../../model/model");
const purchasehistoriesServices = require("../purchasehistories.services");
const testCode = require("../purchasehistories.services");

afterEach(() => {
    jest.clearAllMocks();
  });

const user = 7
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

    test(`Test 1: FindbyPk under showAll should be called once`, async() => {
        User.findByPk = jest.fn();
        PurchaseHistories.findAll = jest.fn();
        const result = await testCode.showAll(data);
        expect(PurchaseHistories.findAll).toBeCalled();
    })

    test(`Test 2: It should return status 200 if Purchase Creation is successful`, async () => {
        PurchaseHistories.findOne = jest.fn().mockReturnValue();
        PurchaseHistories.findAll = jest.fn().mockReturnValue([data]);
        PurchaseHistories.create = jest.fn().mockReturnValue(data);
        const result = await testCode.newPurchase(data,user);
        expect(result.status).toBe(200);
        expect(result.data).toBe(data);
    })
    
    test (`Test 3: It should return error status if Purchase Creation fails`, async () => {
        PurchaseHistories.findOne = jest.fn().mockReturnValue();
        PurchaseHistories.create = jest.fn().mockRejectedValue();
        const result = await testCode.newPurchase(data);
        expect(result.status).toBe(500);
    })

})