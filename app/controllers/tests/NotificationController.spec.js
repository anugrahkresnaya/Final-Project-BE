const NotificationController = require('../NotificationController');
const { Notifications } = require('../../models');

describe("NotificationController", () => {
  describe("#handleGetNotificationList", () => {
    it("should call res.status(200) and res.json with notifications data", async () => {
      const mockRequest = {}

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockNotificationsList = []

      const mockNotifications = {
        'id': 1,
        'orderId': 2,
        'userId': 1,
        'createdAt': '2022-11-17T05:11:01.429Z',
        'updatedAt': '2022-11-17T05:11:01.429Z',
      };

      for (let i = 0; i < 10; i++) {
        mockNotificationsList.push({
          ...mockNotifications,
          id: i + 1,
        });
      }

      const mockNotificationsModel = {
        findAll: jest.fn().mockReturnValue(mockNotificationsList),
      };

      const notificationsController = new NotificationController({
        notificationsModel: mockNotificationsModel,
      });
      await notificationsController.handleGetNotificationList(mockRequest, mockResponse);

      expect(mockNotificationsModel.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Successfully get order list',
        data: mockNotificationsList
      });
    });
  });
});
