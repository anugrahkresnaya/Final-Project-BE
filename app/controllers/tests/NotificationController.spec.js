const NotificationController = require("../NotificationController");

describe("NotificationController", () => {
    describe("#handleGetNotificationList", () => {
        it("should call res.status(200) and res.json with notifications data", async () => {
          const mockRequest = {}
    
          const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
          };
    
          const mockNotifList = []
    
          const mockNotif = {
            'id': 1,
            'orderId': 2,
            'userId': 3,
            'createdAt': '2022-11-17T05:11:01.429Z',
            'updatedAt': '2022-11-17T05:11:01.429Z',
          };
    
          for (let i = 0; i < 10; i++) {
            mockNotifList.push({
              ...mockNotif,
              id: i + 1,
            });
          }
    
          const mockNotifModel = {
            findAll: jest.fn().mockReturnValue(mockNotifList),
          };
    
          const notificationController = new NotificationController({
            notificationsModel: mockNotifModel,
          });
          await notificationController.handleGetNotificationList(mockRequest, mockResponse);
    
          expect(mockNotifModel.findAll).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            message: "Successfully get notification list",
            data: mockNotifList
          });
        });
      });
});
