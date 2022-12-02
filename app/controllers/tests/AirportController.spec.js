const AirportController = require('../AirportController');
const { Airport } = require('../../models');

describe("AirportController", () => {
  describe("#handleGetAirport", () => {
    it("should call res.status(200) and res.json with airport data", async () => {
      const name = "Soekarno Hatta Airport";
      const city = "Jakarta";
      const country = "Indonesia";
      const country_code = "IDN";

      const mockRequest = {
        params: {
          id: 1,
        }
      };

      const mockAirport = new Airport({
        name,
        city,
        country,
        country_code
      });

      const mockAirportModel = {
        findByPk: jest.fn().mockReturnValue(mockAirport),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const airportController = new AirportController({ airportModel: mockAirportModel });
      await airportController.handleGetAirport(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAirport);
    });
  });

  describe("#handleCreateAirport", () => {
    it("should call res.status(201) and res.json with airport data", async () => {
      const name = "Soekarno Hatta Airport";
      const city = "Jakarta";
      const country = "Indonesia";
      const country_code = "IDN";

      const mockRequest = {
        body: {
          name,
          city,
          country,
          country_code
        }
      };
      const mockAirport = new Airport({
        name,
        city,
        country,
        country_code
      });

      const mockAirportModel = {
        create: jest.fn().mockReturnValue(mockAirport),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const airportController = new AirportController({ airportModel: mockAirportModel });
      await airportController.handleCreateAirport(mockRequest, mockResponse);

      expect(mockAirportModel.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAirport);
    });

    it("should call res.status(422) and res.json with error instance", async () => {
      const err = new Error("Something");
      const name = "Soekarno Hatta Airport";
      const city = "Jakarta";
      const country = "Indonesia";
      const country_code = "IDN";

      const mockRequest = {
        body: {
          name,
          city,
          country,
          country_code
        }
      };

      const mockAirportModel = {
        create: jest.fn().mockReturnValue(Promise.reject(err)),
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const airportController = new AirportController({ airportModel: mockAirportModel });
      await airportController.handleCreateAirport(mockRequest, mockResponse);

      expect(mockAirportModel.create).toHaveBeenCalledWith({
        name,
        city,
        country,
        country_code
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

  describe("#handleUpdateAirport", () => {
    it("should call res.status(201) and res.json with airport data", async () => {
      const name = "Soekarno Hatta Airport";
      const city = "Jakarta";
      const country = "Indonesia";
      const country_code = "IDN";

      const mockRequest = {
        params: {
          id: 1,
        },
        body: {
          name,
          city,
          country,
          country_code
        },
      };

      const mockAirport = new Airport({
        name,
        city,
        country,
        country_code
      });
      mockAirport.update = jest.fn().mockReturnThis();

      const mockAirportModel = {
        findByPk: jest.fn().mockReturnValue(mockAirport),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const airportController = new AirportController({ airportModel: mockAirportModel });
      await airportController.handleUpdateAirport(mockRequest, mockResponse);

      expect(mockAirportModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockAirport.update).toHaveBeenCalledWith({
        name,
        city,
        country,
        country_code
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAirport);
    });
  });

  describe("#handleDeleteAirport", () => {
    it("should call res.status(204)", async () => {
      const name = "Soekarno Hatta Airport";
      const city = "Jakarta";
      const country = "Indonesia";
      const country_code = "IDN";

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockAirport = new Airport({
        name,
        city,
        country,
        country_code
      });
      mockAirport.destroy = jest.fn();

      const mockAirportModel = {
        findByPk: jest.fn().mockReturnValue(mockAirport),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis(),
      };

      const airportController = new AirportController({ airportModel: mockAirportModel });
      await airportController.handleDeleteAirport(mockRequest, mockResponse);

      expect(mockAirportModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockAirport.destroy).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.end).toHaveBeenCalled();
    });
  });

  describe("#handleListAirport", () => {
    it("should call res.status(200)", async () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockAirportList = [];

      const mockAirport = {
        'id': 1,
        'name': 'Soekarno Hatta Airport',
        'city': 'Jakarta',
        'country': 'Indonesia',
        'country_code': 'IDN',
        'createdAt': '2022-11-17T05:11:01.429Z',
        'updatedAt': '2022-11-17T05:11:01.429Z',
      };

      for (let i = 0; i < 10; i++) {
        mockAirportList.push({
          ...mockAirport,
          id: i + 1,
        });
      }

      const mockAirplaneModel = {
        findAll: jest.fn().mockReturnValue(mockAirportList),
      };

      const airportController = new AirportController({
        airportModel: mockAirplaneModel,
      });
      await airportController.handleListAirport(mockRequest, mockResponse);

      expect(mockAirplaneModel.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAirportList);
    });
  });

  describe("#getAirportFromRequest", () => {
    it("should return airport id", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockAirport = 1;

      const mockAirportModel = {
        findByPk: jest.fn().mockReturnValue(mockAirport)
      };

      const airportController = new AirportController({ airportModel: mockAirportModel });
      const airport = airportController.getAirportFromRequest(mockRequest);

      expect(airport).toEqual(1);
    });
  });
});
