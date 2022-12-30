const OrderController = require('../OrderController');
const { orders } = require('../../models');

describe("OrderController", () => {
  describe("#handleGetListOrder", () => {
    it("should call res.status(200) and res.json with orders data", async () => {
      const mockRequest = {}

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockOrderList = []

      const mockOrder = {
        'id': 1,
        'ticketId': 2,
        'userId': 1,
        'order_date': '2022-12-25 13:48:24.416+07',
        'createdAt': '2022-11-17T05:11:01.429Z',
        'updatedAt': '2022-11-17T05:11:01.429Z',
      };

      for (let i = 0; i < 10; i++) {
        mockOrderList.push({
          ...mockOrder,
          id: i + 1,
        });
      }

      const mockOrderModel = {
        findAll: jest.fn().mockReturnValue(mockOrderList),
      };

      const orderController = new OrderController({
        ordersModel: mockOrderModel,
      });
      await orderController.handleGetListOrder(mockRequest, mockResponse);

      expect(mockOrderModel.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Successfully get order list',
        data: mockOrderList
      });
    });
  });
});
