const HistoryController = require('../HistoryController');
const { Orders } = require('../../models');

describe("HistoryController", () => {
  describe("#handleGetHistoryById", () => {
    it("should call res.status(200) and res.json with history data by ID", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockHistory = {
        'id': 1,
        'ticketId': 2,
        'userId': 1,
        'order_date': '2022-12-25 13:48:24.416+07',
        'createdAt': '2022-11-17T05:11:01.429Z',
        'updatedAt': '2022-11-17T05:11:01.429Z',
      };
      
      const mockHistoryModel = {
        findByPk: jest.fn().mockReturnValue(mockHistory),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const historyController = new HistoryController({ ordersModel: mockHistoryModel });
      await historyController.handleGetHistoryById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "History data fetched successfully",
        data: mockHistory
      });
    });
  });

  describe("#handleGetListHistory", () => {
    it("should call res.status(200) and res.json with history data", async () => {
      const mockRequest = {}

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockHistoryList = []

      const mockHistory = {
        'id': 1,
        'ticketId': 2,
        'userId': 1,
        'order_date': '2022-12-25 13:48:24.416+07',
        'createdAt': '2022-11-17T05:11:01.429Z',
        'updatedAt': '2022-11-17T05:11:01.429Z',
      };

      for (let i = 0; i < 10; i++) {
        mockHistoryList.push({
          ...mockHistory,
          id: i + 1,
        });
      }

      const mockHistoryModel = {
        findAll: jest.fn().mockReturnValue(mockHistoryList),
      };

      const historyController = new HistoryController({
        ordersModel: mockHistoryModel,
      });
      await historyController.handleGetListHistory(mockRequest, mockResponse);

      expect(mockHistoryModel.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "Successfully get history list",
        data: mockHistoryList
      });
    });
  });

  describe("#getAirplaneFromRequest", () => {
    it("should return history id", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockHistory = 1;

      const mockHistoryModel = {
        findByPk: jest.fn().mockReturnValue(mockHistory),
      };

      const historyController = new HistoryController({ ordersModel: mockHistoryModel });
      const history = historyController.getHistoryFromRequest(mockRequest);

      expect(history).toEqual(1);
    });
  });
});
