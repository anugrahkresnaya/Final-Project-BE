const { Tickets, Orders, Notifications } = require('../../models');
const TicketController = require('../TicketController');
describe("TicketController", () => {
  describe("#handleGetTicket", () => {
    it("should call res.status(200) and res.json with Ticket data", async () => {
      const departure_time = "2022-12-06T13:32:18.228Z";
      const arrival_time = "2022-12-14T13:32:18.228Z";
      const return_time = "2022-12-06T13:32:18.228Z";
      const arrival2_time = "2022-12-14T13:32:18.228Z";
      const price = "860000";
      const category = "round_trip";
      const airplane_name = "Garuda Indonesia";
      const origin = "Jakarta";
      const destination = "Medan";

      

      const mockRequest = {
        params: {
          id: 1,
        }
      };
      const mockTicket = new Tickets({
        departure_time,
        arrival_time,
        return_time,
        arrival2_time,
        price,
        category,
        airplane_name,
        origin,
        destination,
      });


      const mockTicketModel = {
        findByPk: jest.fn().mockReturnValue(mockTicket),
      };
      

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const ticket = new TicketController({ ticketsModel: mockTicketModel });
      await ticket.handleGetTicket(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "get ticket successful",
        data: mockTicket
      });
    });
  });

  describe("#handleCreateTicket", () => {
    it("should call res.status(200) and res.json with Ticket data", async () => {
      const departure_time = "2022-12-06T13:32:18.228Z";
      const arrival_time = "2022-12-14T13:32:18.228Z";
      const return_time = "2022-12-06T13:32:18.228Z";
      const arrival2_time = "2022-12-14T13:32:18.228Z";
      const price = "860000";
      const category = "round_trip";
      const airplane_name = "Garuda Indonesia";
      const origin = "Jakarta";
      const destination = "Medan";
      
      
      const mockRequest = {
        body: {
          departure_time,
          arrival_time,
          return_time,
          arrival2_time,
          price,
          category,
          airplane_name,
          origin,
          destination,
        },
        user : {
            id : 1,
        }
      };
      const mockTicket = new Tickets({
        departure_time,
        arrival_time,
        return_time,
        arrival2_time,
        price,
        category,
        airplane_name,
        origin,
        destination,
        createdBy : mockRequest.user.id,
      });

      const mockTicketModel = {
        create: jest.fn().mockReturnValue(mockTicket),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const ticket = new TicketController({ ticketsModel: mockTicketModel });
      await ticket.handleCreateTicket(mockRequest, mockResponse);

      expect(mockTicketModel.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Ticket data added successfully',
        data: mockTicket
      });
    });

   
  });

  describe("#handleUpdateTicket", () => {
    it("should call res.status(200) and res.json with ticket data", async () => {
      const departure_time = "2022-12-06T13:32:18.228Z";
      const arrival_time = "2022-12-14T13:32:18.228Z";
      const return_time = "2022-12-06T13:32:18.228Z";
      const arrival2_time = "2022-12-14T13:32:18.228Z";
      const price = "860000";
      const category = "round_trip";
      const origin = "jakarta";
      const destination = "medan";

      
    
      const mockRequest = {
        params: {
          id: 1,
        },
        body: {
          departure_time,
          arrival_time,
          return_time,
          arrival2_time,
          price,
          category,
          origin,
          destination,


        },
        user :{
            id : 1,
        }
      };

      const mockTicket = new Tickets({
        departure_time,
        arrival_time,
        return_time,
        arrival2_time,
        price,
        category,
        origin,
        destination,
        updatedBy:mockRequest.user.id,
      });
      mockTicket.update = jest.fn().mockReturnThis();

      const mockTicketModel = {
        findByPk: jest.fn().mockReturnValue(mockTicket),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const ticket = new TicketController({ ticketsModel: mockTicketModel });
      await ticket.handleUpdateTicket(mockRequest, mockResponse);

      expect(mockTicketModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockTicket.update).toHaveBeenCalledWith({
        departure_time,
        arrival_time,
        return_time,
        arrival2_time,
        price,
        category,
        origin,
        destination,
        updatedBy:mockRequest.user.id,
        
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "Ticket data updated successfully",
        data: mockTicket
      });
    });
  });

  describe("#handleDeleteTicket", () => {
    it("should call res.status(200)", async () => {
      const departure_time = "2022-12-06T13:32:18.228Z";
      const arrival_time = "2022-12-14T13:32:18.228Z";
      const price = "860000";
      const category = "one_way";
      const airplane_name = "Garuda Indonesia";
      const origin = "Jakarta";
      const destination = "Medan";


      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockTicket = new Tickets({
        departure_time,
        arrival_time,
        price,
        category,
        airplane_name,
        origin,
        destination,
      });
      mockTicket.destroy = jest.fn();

      const mockTicketModel = {
        findByPk: jest.fn().mockReturnValue(mockTicket),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const ticket = new TicketController({ ticketsModel: mockTicketModel });
      await ticket.handleDeleteTicket(mockRequest, mockResponse);

      expect(mockTicketModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockTicket.destroy).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Ticket data deleted successfully',
      });
    });
  });

  describe("#handleListTicket", () => {
    it("should call res.status(200)", async () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockTicketList = [];

      const mockTicket = {
        'id': 1,
        'name': 'Soekarno Hatta Airport',
        'city': 'Jakarta',
        'country': 'Indonesia',
        'country_code': 'IDN',
        'createdAt': '2022-11-17T05:11:01.429Z',
        'updatedAt': '2022-11-17T05:11:01.429Z',
      };

      for (let i = 0; i < 10; i++) {
        mockTicketList.push({
          ...mockTicket,
          id: i + 1,
        });
      }

      const mockTicketModel = {
        findAll: jest.fn().mockReturnValue(mockTicketList),
      };

      const ticket = new TicketController({
        ticketsModel: mockTicketModel,
      });
      await ticket.handleListTickets(mockRequest, mockResponse);

      expect(mockTicketModel.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "get ticket list successful",
        data: mockTicketList
      });
    });
  });
  describe("#handleOrderTicket", () => {
    it("should bla bla", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
        user: {
          id: 1,
        },
        orderId:{
            id : 1,
        }
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      }

      const mockTicket = {
        "id": 1,
        "airplane_name": "Garuda Indonesia",
        "departure_time": "2022-12-30T14:21:19.639Z",
        "arrival_time": "2022-12-30T15:21:21.639Z",
        "return_time": null,
        "arrival2_time": null,
        "price": 390000,
        "category": "one_way",
        "origin": "Jakarta",
        "destination": "Medan",
        "createdBy": 1,
        "updatedBy": null,
        "deletedAt": null,
        "createdAt": "2022-12-30T14:21:19.639Z",
        "updatedAt": "2022-12-30T14:21:19.639Z"
      };
      const mockNotif = {
        "id" : 1,
        "userId": 1,
        "orderId" : 1,
      }
      const mockNotifModel = {
        findOne: jest.fn().mockReturnValue(null),
        create: jest.fn().mockReturnValue({...mockNotif}),
      }
      const mockTicketModel = {
        findByPk: jest.fn().mockReturnValue(mockTicket)
      };

      const mockOrder = {
        "id": 1,
        "userId": 1,
        "ticketId": 1,
        "order_date": "2022-09-22T08:36:55.584Z",
        "createdAt": "2022-09-22T08:36:55.584Z",
        "updatedAt": "2022-09-22T08:36:55.584Z"    
      };

      const mockOrderModel = {
        findOne: jest.fn().mockReturnValue(null),
        create: jest.fn().mockReturnValue({...mockOrder}),
      };

      const mockNext = jest.fn();

      const ticketController = new TicketController({
        ticketsModel: mockTicketModel,
        ordersModel: mockOrderModel,
        notificationsModel : mockNotifModel,
      });
      await ticketController.handleOrderTicket(mockRequest, mockResponse, mockNext);

      console.log(mockResponse.status)
      expect(mockTicketModel.findByPk).toHaveBeenCalled();
      expect(mockOrderModel.create).toHaveBeenCalled();
      expect(mockNotifModel.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockOrder)
    })
  })

  describe("#getTicketFromRequest", () => {
    it("should return ticket id", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockTicket = 1;

      const mockTicketModel = {
        findByPk: jest.fn().mockReturnValue(mockTicket)
      };

      const ticketController = new TicketController({ ticketsModel: mockTicketModel });
      const ticket = ticketController.getTicketFromRequest(mockRequest);

      expect(ticket).toEqual(1);
    });
  });
});
