const { Tickets } = require('../../models');
const TicketController = require('../TicketController');
describe("TicketController", () => {
  describe("#handleGetTicket", () => {
    it("should call res.status(200) and res.json with Ticket data", async () => {
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
        }
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

      const mockTicketModel = {
        findByPk: jest.fn().mockReturnValue(mockTicket),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const ticket = new TicketController({ ticketModel: mockTicketModel });
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
      const price = "860000";
      const category = "one_way";
      const airplane_name = "Garuda Indonesia";
      const origin = "Jakarta";
      const destination = "Medan";
      const mockRequest = {
        body: {
          departure_time,
          arrival_time,
          price,
          category,
          airplane_name,
          origin,
          destination,
        }
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

      const mockTicketModel = {
        create: jest.fn().mockReturnValue(mockTicket),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const ticket = new TicketController({ ticketModel: mockTicketModel });
      await ticket.handleCreateTicket(mockRequest, mockResponse);

      expect(mockTicketModel.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Ticket data added successfully',
        data: mockTicket
      });
    });

    it("should call res.status(422) and res.json with error instance", async () => {
      const err = new Error("Something");
      const departure_time = "2022-12-06T13:32:18.228Z";
      const arrival_time = "2022-12-14T13:32:18.228Z";
      const price = "860000";
      const category = "one_way";
      const airplane_name = "Garuda Indonesia";
      const origin = "Jakarta";
      const destination = "Medan";

      const mockRequest = {
        body: {
          departure_time,
          arrival_time,
          price,
          category,
          airplane_name,
          origin,
          destination,
        }
      };

      const mockTicketModel = {
        create: jest.fn().mockReturnValue(Promise.reject(err)),
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const ticket = new TicketController({ ticketModel: mockTicketModel });
      await ticket.handleCreateTicket(mockRequest, mockResponse);

      expect(mockTicketModel.create).toHaveBeenCalledWith({
          departure_time,
          arrival_time,
          price,
          category,
          airplane_name,
          origin,
          destination,
      });
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    });
  });

  describe("#handleUpdateTicket", () => {
    it("should call res.status(200) and res.json with Ticket data", async () => {
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
        body: {
          departure_time,
          arrival_time,
          price,
          category,
          airplane_name,
          origin,
          destination,
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
      mockTicket.update = jest.fn().mockReturnThis();

      const mockTicketModel = {
        findByPk: jest.fn().mockReturnValue(mockTicket),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const ticket = new TicketController({ TicketModel: mockTicketModel });
      await ticket.handleUpdateTicket(mockRequest, mockResponse);

      expect(mockTicketModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockTicket.update).toHaveBeenCalledWith({
        departure_time,
        arrival_time,
        price,
        category,
        airplane_name,
        origin,
        destination,
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Ticket data updated successfully',
        data: mockTicket
      });
    });
  });

  describe("#handleDeleteTicket", () => {
    it("should call res.status(204)", async () => {
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

      const ticket = new TicketController({ ticketModel: mockTicketModel });
      await ticket.handleDeleteTicket(mockRequest, mockResponse);

      expect(mockTicketModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockTicket.destroy).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(204);
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
        ticketModel: mockTicketModel,
      });
      await ticket.handleListTicket(mockRequest, mockResponse);

      expect(mockTicketModel.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "get ticket list successful",
        data: mockTicketList
      });
    });
  });

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

      const ticketController = new TicketController({ ticketModel: mockTicketModel });
      const ticket = ticketController.getTicketFromRequest(mockRequest);

      expect(ticket).toEqual(1);
    });
  });
});
