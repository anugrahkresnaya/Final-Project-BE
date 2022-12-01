const AirplaneController = require('../AirplaneController');
const { Airplane } = require('../../models');

describe("AirplaneController", () => {
  describe("#handleCreateAirplane", () => {
    it("should call res.status(200) and res.json with airplane data", async () => {
      const name = "Garuda Indonesia";
      const code = "GIA";
      const country = "Indonesia";

      const mockRequest = {
        body: {
          name,
          code,
          country,
        },
      };

      const mockAirplane = new Airplane({ name, code, country });
      const mockAirplaneModel = {
        create: jest.fn().mockReturnValue(mockAirplane),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const airplaneController = new AirplaneController({ airplaneModel: mockAirplaneModel });
      await airplaneController.handleCreateAirplane(mockRequest, mockResponse);

      expect(mockAirplaneModel.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAirplane);
    });

    it("should call res.status(422) and res.json with error instance", async () => {
      const err = new Error("error something");
      const name = "Garuda Indonesia";
      const code = "GIA";
      const country = "Indonesia";

      const mockRequest = {
        body: {
          name,
          code,
          country,
        },
      };

      const mockAirplaneModel = {
        create: jest.fn().mockReturnValue(Promise.reject(err)),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const airplaneController = new AirplaneController({ airplaneModel: mockAirplaneModel });
      await airplaneController.handleCreateAirplane(mockRequest, mockResponse);

      expect(mockAirplaneModel.create).toHaveBeenCalledWith({ name, code, country });
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    });
  });

  describe("#handleGetAirplane", () => {
    it("should call res.status(200) and res.json with airplane data", async () => {
      const name = "Garuda Indonesia";
      const code = "GIA";
      const country = "Indonesia";

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockAirplane = new Airplane({ name, code, country });
      const mockAirplaneModel = {
        findByPk: jest.fn().mockReturnValue(mockAirplane),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const airplaneController = new AirplaneController({ airplaneModel: mockAirplaneModel });
      await airplaneController.handleGetAirplane(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAirplane);
    });
  });

  describe("#handleUpdateAirplane", () => {
    it("should call res.status(200) and res.json with airplane data", async () => {
      const name = "Garuda Indonesia";
      const code = "GIA";
      const country = "Indonesia";

      const mockRequest = {
        params: {
          id: 1,
        },
        body: {
          name,
          code,
          country
        },
      };

      const mockAirplane = new Airplane({ name, code, country });
      mockAirplane.update = jest.fn().mockReturnThis();

      const mockAirplaneModel = {
        findByPk: jest.fn().mockReturnValue(mockAirplane),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const airplaneController = new AirplaneController({ airplaneModel: mockAirplaneModel });
      await airplaneController.handleUpdateAirplane(mockRequest, mockResponse);

      expect(mockAirplaneModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockAirplane.update).toHaveBeenCalledWith({ name, code, country });
      expect(mockResponse.status).toHaveBeenCalledWith(200)
    });
  });

  describe("#handleDeleteAirplane", () => {
    it("should call res.status(204)", async () => {
      const name = "Garuda Indonesia";
      const code = "GIA";
      const country = "Indonesia";

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockAirplane = new Airplane({ name, code, country });
      mockAirplane.destroy = jest.fn();

      const mockAirplaneModel = {
        findByPk: jest.fn().mockReturnValue(mockAirplane),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis(),
      };

      const airplaneController = new AirplaneController({ airplaneModel: mockAirplaneModel });
      await airplaneController.handleDeleteAirplane(mockRequest, mockResponse);

      expect(mockAirplaneModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockAirplane.destroy).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.end).toHaveBeenCalled();
    });
  });

  describe("#handleListAirplane", () => {
    it("should call res.status(200) and res.json with airplane data", async () => {
      const mockRequest = {}

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockAirplaneList = []

      const mockAirplane = {
        'id': 1,
        'name': 'Garuda Indonesia',
        'code': 'GIA',
        'country': 'Indonesia',
        'createdAt': '2022-11-17T05:11:01.429Z',
        'updatedAt': '2022-11-17T05:11:01.429Z',
      };

      for (let i = 0; i < 10; i++) {
        mockAirplaneList.push({
          ...mockAirplane,
          id: i + 1,
        });
      }

      const mockAirplaneModel = {
        findAll: jest.fn().mockReturnValue(mockAirplaneList),
      };

      const airplaneController = new AirplaneController({
        airplaneModel: mockAirplaneModel,
      });
      await airplaneController.handleListAirplane(mockRequest, mockResponse);

      expect(mockAirplaneModel.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAirplaneList);
    });
  });

  describe("#getAirplaneFromRequest", () => {
    it("should return airplane id", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockAirplane = 1;

      const mockAirplaneModel = {
        findByPk: jest.fn().mockReturnValue(mockAirplane),
      };

      const airplaneController = new AirplaneController({ airplaneModel: mockAirplaneModel });
      const airplane = airplaneController.getAirplaneFromRequest(mockRequest);

      expect(airplane).toEqual(1);
    });
  });
});
