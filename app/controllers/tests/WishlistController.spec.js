const WishlistController = require('../WishlistController');
const { Wishlist, Tickets } = require('../../models');

describe("WihslistController", () => {
  describe("handleCreateWishlist", () => {
    it("should call res.status(201)", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
        user: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

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
        "updatedBy": 1,
        "deletedAt": null,
        "createdAt": "2022-12-30T14:21:19.639Z",
        "updatedAt": "2022-12-30T14:21:19.639Z"
      };

      const mockTicketModel = {
        findByPk: jest.fn().mockReturnValue(mockTicket)
      };

      const mockWishlist = {
        'id': 1,
        'ticketId': 1,
        'userId': 1,
        'destroyedAt': '2022-12-20T11:11:01.425Z',
        'createdAt': '2022-12-20T11:11:01.425Z',
        'updatedAt': '2022-12-20T11:11:01.425Z',
      };

      const mockWishlistModel = {
        findOne: jest.fn().mockReturnValue(null),
        create: jest.fn().mockReturnValue({ ...mockWishlist })
      };

      const wishlistController = new WishlistController({
        ticketsModel: mockTicketModel,
        wishlistModel: mockWishlistModel
      });
      await wishlistController.handleCreateWishlist(mockRequest, mockResponse);

      expect(mockWishlistModel.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Wishlist successfully added',
        data: mockWishlist
      });
    });

    it("should call res.status(422) and res.json with error instance", async () => {
      const err = new Error("");

      const mockRequest = {
        params: {
          id: 1,
        },
        user: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockTicketModel = {
        findByPk: jest.fn().mockRejectedValue(new Error()),
      };

      const mockWishlistModel = {};

      const wishlistController = new WishlistController({
        ticketsModel: mockTicketModel,
        wishlistModel: mockWishlistModel,
      });
      await wishlistController.handleCreateWishlist(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message
        }
      })
    });
  });

  describe("handleGetWishlistList", () => {
    it("should call res.status(200)", async () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockWishlistList = [];

      const mockWishlist = {
        'id': 1,
        'ticketId': 1,
        'userId': 1,
        'destroyedAt': '2022-12-20T11:11:01.425Z',
        'createdAt': '2022-12-20T11:11:01.425Z',
        'updatedAt': '2022-12-20T11:11:01.425Z',
      };

      for (let i = 0; i < 10; i++) {
        mockWishlistList.push({
          ...mockWishlist,
          id: i + 1,
        });
      }

      const mockWishlistModel = {
        findAll: jest.fn().mockReturnValue(mockWishlistList),
      };

      const wishlistController = new WishlistController({
        wishlistModel: mockWishlistModel,
      });
      await wishlistController.handleGetWishlistList(mockRequest, mockResponse);

      expect(mockWishlistModel.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Wishlist list data fetched successfully',
        data: mockWishlistList,
      })
    });
  });

  describe("handlegetWishlistById", () => {
    it("should call res.status(200)", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockWishlist = {
        'id': 1,
        'ticketId': 1,
        'userId': 1,
        'destroyedAt': '2022-12-20T11:11:01.425Z',
        'createdAt': '2022-12-20T11:11:01.425Z',
        'updatedAt': '2022-12-20T11:11:01.425Z',
      };

      const mockWishlistModel = {
        findByPk: jest.fn().mockReturnValue(mockWishlist),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const wishlistController = new WishlistController({
        wishlistModel: mockWishlistModel,
      });
      await wishlistController.handleGetWishlistById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Wishlist data fetched successfully',
        data: mockWishlist,
      });
    });
  });

  describe("handleDeleteWishlist", () => {
    it("should call res.status(200)", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockWishlist = {
        'id': 1,
        'ticketId': 1,
        'userId': 1,
        'destroyedAt': '2022-12-20T11:11:01.425Z',
        'createdAt': '2022-12-20T11:11:01.425Z',
        'updatedAt': '2022-12-20T11:11:01.425Z',
      };
      mockWishlist.destroy = jest.fn();

      const mockWishlistModel = {
        findByPk: jest.fn().mockReturnValue(mockWishlist),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const wishlistController = new WishlistController({
        wishlistModel: mockWishlistModel,
      });
      await wishlistController.handleDeleteWishlist(mockRequest, mockResponse);

      expect(mockWishlistModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockWishlist.destroy).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Wishlist successfully deleted',
      })
    });
  });
});
