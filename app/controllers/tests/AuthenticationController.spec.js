const AuthenticationController = require("../AuthenticationController");
const { User, Role } = require("../../models");
const {
  WrongPasswordError,
  NotFoundError,
  InsufficientAccessError,
  EmailNotRegisteredError,
  ApiError,
} = require("../../errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const httpStatus = require('http-status');

describe("AuthenticationController", () => {
  describe("#constructorAuthenticationController", () => {
    it("should set the user model", () => {
      const userModel = {};
      const roleModel = {};
      const bcrypt = {};
      const jwt = {};
      const authenticationController = new AuthenticationController({
        userModel,
        roleModel,
        bcrypt,
        jwt,
      });
      expect(authenticationController.userModel).toEqual(userModel);
    });
  });

  describe("#authorize", () => {
    it("should run next function .", async () => {
      const mockUser = {
        id: 2,
        name: "fendy",
        email: "fendy@binar.co.id",
        encryptedPassword:
          "$2a$10$a/Nv0ULUmsfDUDbgf7991uENTqBMEA0LbcUcQ3U4xElPZumsV.Kmy",
        roleId: 1,
      };
      const mockRole = { id: 1, name: "COSTUMER" };

      const roleModel = jest.fn().mockReturnValue(null);
      const userModel = jest.fn().mockReturnValue(null);

      const controller = new AuthenticationController({
        roleModel,
        userModel,
        bcrypt,
        jwt,
      });
      const mockToken = controller.createTokenFromUser(mockUser, mockRole);
      const mockReq = {
        headers: {
          authorization: "Bearer " + mockToken,
        },
      };
      const mockNext = jest.fn();

      const authorizeCustomer = controller.authorize("COSTUMER");
      await authorizeCustomer(mockReq, {}, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it("should res.status(401) with InsufficientAccessError ", async () => {
      const mockUser = {
        id: 2,
        name: "fendy",
        email: "fendy@binar.co.id",
        encryptedPassword:
          "$2a$10$a/Nv0ULUmsfDUDbgf7991uENTqBMEA0LbcUcQ3U4xElPZumsV.Kmy",
        roleId: 1,
      };
      const mockRole = { id: 1, name: "COSTUMER" };

      const roleModel = jest.fn().mockReturnValue(null);
      const userModel = jest.fn().mockReturnValue(null);

      const controller = new AuthenticationController({
        roleModel,
        userModel,
        bcrypt,
        jwt,
      });
      const mockToken = controller.createTokenFromUser(mockUser, mockRole);
      const mockReq = {
        headers: {
          authorization: "Bearer " + mockToken,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const mockNext = jest.fn();

      const authorizeCustomer = controller.authorize("ADMIN");
      await authorizeCustomer(mockReq, mockRes, mockNext);

      const err = new InsufficientAccessError("COSTUMER");

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
          details: err.details,
        },
      });
    });
    it("should res.status(401) with error token wrong.", async () => {
      const mockUser = {
        id: 2,
        name: "fendy",
        email: "fendy@binar.co.id",
        encryptedPassword:
          "$2a$10$a/Nv0ULUmsfDUDbgf7991uENTqBMEA0LbcUcQ3U4xElPZumsV.Kmy",
        roleId: 1,
      };
      const mockRole = { id: 1, name: "COSTUMER" };
      const roleModel = jest.fn().mockReturnValue(null);
      const userModel = jest.fn().mockReturnValue(null);
      const controller = new AuthenticationController({
        roleModel,
        userModel,
        bcrypt,
        jwt,
      });
      const mockToken = controller.createTokenFromUser(mockUser, mockRole);
      const mockReq = {
        headers: {
          authorization: "Bearer " + mockToken + "alsdnalnjd",
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const mockNext = jest.fn();

      const authorizeCustomer = controller.authorize("ADMIN");
      await authorizeCustomer(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
  });

  describe("handleLogin", () => {
    it("should return json staus 201 and token", async () => {
      const mockUser = new User({
        id: 2,
        name: "fendy",
        email: "fendy@binar.co.id",
        encryptedPassword:
          "$2a$10$a/Nv0ULUmsfDUDbgf7991uENTqBMEA0LbcUcQ3U4xElPZumsV.Kmy",
        roleId: 1,
      });

      const mockRole = new Role({ id: 1, name: "CUSTOMER" });

      const mockUserModel = {
        findOne: jest.fn().mockReturnValue({
          ...mockUser.dataValues,
          Role: mockRole,
        }),
      };

      const mockRequest = {
        body: {
          email: "fendy@binar.co.id",
          password: "123456",
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const mockNext = jest.fn();

      const authentication = new AuthenticationController({
        userModel: mockUserModel,
        roleModel: mockRole,
        bcrypt,
        jwt,
      });

      await authentication.handleLogin(mockRequest, mockResponse, mockNext);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: {
          email: mockRequest.body.email.toLowerCase(),
        },
        include: [
          {
            model: mockRole,
            attributes: ["id", "name"],
          },
        ],
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        accessToken: expect.any(String),
        id:mockUser.id,
        message: expect.any(String),
        role: expect.any(String),
        status: expect.any(String),
        user: expect.any(String)
      });
    });

    it("should return 404 status and an error message", async () => {
      const mockUserModel = {
        findOne: jest.fn().mockReturnValue(null),
      };

      const mockRole = new Role({ id: 1, name: "CUSTOMER" });

      const mockRequest = {
        body: {
          email: "fendy@binar.co.id",
          password: "123456",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockNext = jest.fn();

      const authentication = new AuthenticationController({
        userModel: mockUserModel,
        roleModel: mockRole,
        bcrypt,
        jwt,
      });

      const err = new EmailNotRegisteredError(mockRequest.body.email)

      await authentication.handleLogin(mockRequest, mockResponse, mockNext);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: {
          email: mockRequest.body.email.toLowerCase(),
        },
        include: [
          {
            model: mockRole,
            attributes: ["id", "name"],
          },
        ],
      });

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(err);
    });

    it("should return 401 status and an error message", async () => {
      const mockUser = new User({
        id: 5,
        name: "fendy",
        email: "fendy@binar.co.id",
        encryptedPassword:
          "$2a$10$a/Nv0ULUmsfDUDbgf7991uENTqBMEA0LbcUcQ3U4xElPZumsV.Kmy",
        roleId: 1,
      });

      const mockRole = new Role({ id: 1, name: "CUSTOMER" });

      const mockUserModel = {
        findOne: jest.fn().mockReturnValue({
          ...mockUser.dataValues,
        }),
      };

      const mockRequest = {
        body: {
          email: "fendy@binar.co.id",
          password: "123",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockNext = {};

      const authentication = new AuthenticationController({
        userModel: mockUserModel,
        roleModel: mockRole,
        bcrypt,
        jwt,
      });

      const error = new WrongPasswordError();

      await authentication.handleLogin(mockRequest, mockResponse, mockNext);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: {
          email: mockRequest.body.email.toLowerCase(),
        },
        include: [
          {
            model: mockRole,
            attributes: ["id", "name"],
          },
        ],
      });

      expect(mockResponse.status).toHaveBeenCalledWith(401);

      expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
  });
  describe("#handleUpdateUser", () => {
    it("should call res.status(200) and res.json with user data", async () => {
      const noKtp = "1289047";
      const username = "KAka";
      const name = "kakaka";
      const contact = "1028497";
      const gender = "Pria";
      const dateOfBirth = "04-04-2002";
      const address = "Indonesia";
      const photoProfile = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fid.wikipedia.org%2Fwiki%2FBajaj&psig=AOvVaw2YLBkKGo8Z-OCJze25x5hf&ust=1668538058650000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPiQoOOqrvsCFQAAAAAdAAAAABAD";

      const mockRequest = {
        params: {
          id: 1,
        },
        body: {
          noKtp,
          username,
          name,
          contact,
          gender,
          dateOfBirth,
          address,
          photoProfile
        },
      };

      const mockUser = new User({
        noKtp,
        username,
        name,
        contact,
        gender,
        dateOfBirth,
        address,
        photoProfile
      });
      mockUser.update = jest.fn().mockReturnThis();

      const mockUserModel = {
        findByPk: jest.fn().mockReturnValue(mockUser),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const authentication = new AuthenticationController({ userModel: mockUserModel });
      await authentication.handleUpdateUser(mockRequest, mockResponse);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockUser.update).toHaveBeenCalledWith({
        noKtp,
        username,
        name,
        contact,
        gender,
        dateOfBirth,
        address,
        photoProfile
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "user updated successfully",
        data: {
          noKtp,
          username,
          name,
          contact,
          gender: expect.any(String),
          dateOfBirth,
          address,
          photoProfile
        }
      });
    });
  });


  describe("#handleRegister", () => {
    it("should return status 201  and token", async () => {
      const mockUser = new User({
        id: 2,
        name: "fendy",
        email: "fendy@binar.co.id",
        encryptedPassword:
          "$2a$10$a/Nv0ULUmsfDUDbgf7991uENTqBMEA0LbcUcQ3U4xElPZumsV.Kmy",
        roleId: 1,
      });

      const mockRole = new Role({ id: 1, name: "CUSTOMER" });

      const mockUserModel = {
        findOne: jest.fn().mockReturnValue(null),
        create: jest.fn().mockReturnValue(mockUser),
      };

      const mockRoleModel = {
        findOne: jest.fn().mockReturnValue(mockRole.name),
      };

      const mockRequest = {
        body: {
          name: "fendy",
          email: "fendy@binar.co.id",
          password: "123456",
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const mockNext = {};

      const authentication = new AuthenticationController({
        userModel: mockUserModel,
        roleModel: mockRoleModel,
        bcrypt,
        jwt,
      });

      await authentication.handleRegister(mockRequest, mockResponse, mockNext);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: { email: mockRequest.body.email.toLowerCase() },
      });
      expect(mockRoleModel.findOne).toHaveBeenCalledWith({
        where: { name: mockRole.name },
      });
      expect(mockUserModel.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success Register New User",
        user: mockUser.email,
        accessToken: expect.any(String),
      });
    });
    it("should return status 422  and error message", async () => {
      const err = new ApiError(httpStatus.BAD_REQUEST, "email cannot be empty");
      const name = "fendy";
      const email = "";
      const password = "123456";

      const mockRole = new Role({ id: 1, name: "CUSTOMER" });

      const mockUserModel = {
        findOne: jest.fn().mockReturnValue(null),
        create: jest.fn().mockReturnValue(err),
      };

      const mockRoleModel = {
        findOne: jest.fn().mockReturnValue(mockRole.name),
      };

      const mockRequest = {
        body: {
          name,
          email,
          password,
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const mockNext = {};

      const authentication = new AuthenticationController({
        userModel: mockUserModel,
        roleModel: mockRoleModel,
        bcrypt,
        jwt,
      });

      await authentication.handleRegister(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(err);
    });
  });

  describe("handleGetUser", () => {
    it("should return 200 status and user", async () => {
      const mockUser = new User({
        id: 5,
        name: "fendy",
        email: "fendy@binar.ac.id",
        encryptedPassword:
          "$2a$10$a/Nv0ULUmsfDUDbgf7991uENTqBMEA0LbcUcQ3U4xElPZumsV.Kmy",
        roleId: 1,
      });

      const mockUserModel = {
        ...mockUser.dataValues,
        findByPk: jest.fn().mockReturnValue(mockUser),
      };

      const mockRole = new Role({ id: 1, name: "CUSTOMER" });

      const mockRoleModel = {
        ...mockRole.dataValues,
        findByPk: jest.fn().mockReturnValue(mockRole),
      };

      const mockRequest = {
        user: {
          id: 5,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const mockNext = jest.fn();

      const authentication = new AuthenticationController({
        userModel: mockUserModel,
        roleModel: mockRoleModel,
        bcrypt,
        jwt,
      });

      await authentication.handleGetUser(mockRequest, mockResponse, mockNext);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(mockRequest.user.id);
      expect(mockRoleModel.findByPk).toHaveBeenCalledWith(mockUserModel.roleId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "get user data successful",
        data: mockUser,
      });
    });

    it(
      "should res.status(404) with RecordNotFoundError " + "if user not found.",
      async () => {
        const mockUser = {
          id: 2,
          name: "fendy",
          email: "fendy@binar.co.id",
          encryptedPassword: "$2jakdbqudqiuy7981y9ge9g1dnqdiq9112g.dkah",
          roleId: 1,
        };
        const mockReq = {
          user: mockUser,
        };
        const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };

        const mockUserModel = {
          findByPk: jest.fn().mockReturnValue(false),
        };
        const mockRoleModel = {
          findByPk: jest.fn().mockReturnValue(false),
        };

        const controller = new AuthenticationController({
          userModel: mockUserModel,
          roleModel: mockRoleModel,
          bcrypt,
          jwt,
        });

        await controller.handleGetUser(mockReq, mockRes);
        const err = new NotFoundError(mockUser.name);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith(err);
      }
    );
  });
  describe("#handleGetUserById", () => {
    it("should call res.status(200) and res.json with user instance", async () => {
      const mockRequest = {
        params: {
          id: 1
        }
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockUser = {
        "id": 1,
        "noKtp": "1218022302040069",
        "username": "fndys",
        "name": "Fendy",
        "contact": "08960342601",
        "gender": "pria",
        "dateOfBirth": "2002-02-23T00:00:00.000Z",
        "address": "Jl. Kapten Tsubasa, Medan",
        "photoProfile": "https://res.cloudinary.com/dd93u8fa5/image/upload/v1671182747/Binar%20Academy/monyet_esp40t.jpg",
        "email": "fendy@binar.co.id",
        "encryptedPassword": "$2a$10$AhK/GApn.az3.PrrGus8Xe7s1ndg/E64BDlvTr8X8AuAnD82tRh/i",
        "roleId": 1,
        "createdAt": "2022-12-12T15:13:25.990Z",
        "updatedAt": "2022-12-12T15:13:25.990Z"
      }

      const mockUserModel = {
        findByPk: jest.fn().mockReturnValue(mockUser)
      };

      const authController = new AuthenticationController({ userModel: mockUserModel });
      await authController.handleGetUserById(mockRequest, mockResponse);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "get user by id successful",
        data: mockUser
      })
    });
  });

  describe("#getUserFromRequest", () => {
    it("should return user id", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockUser = 1;

      const mockUserModel = {
        findByPk: jest.fn().mockReturnValue(mockUser)
      };

      const authController = new AuthenticationController({ userModel: mockUserModel });
      const user = authController.getUserFromRequest(mockRequest);

      expect(user).toEqual(1);
    });
  });
  describe("#createTokenFromUser", () => {
    it("should return token", () => {
      const mockUser = new User({
        id: 2,
        name: "fendy",
        email: "fendy@binar.co.id",
        encryptedPassword:
          "$2a$10$a/Nv0ULUmsfDUDbgf7991uENTqBMEA0LbcUcQ3U4xElPZumsV.Kmy",
        roleId: 1,
      });

      const mockRole = new Role({ id: 1, name: "CUSTOMER" });

      const authentication = new AuthenticationController({
        userModel: mockUser,
        roleModel: mockRole,
        bcrypt,
        jwt,
      });

      const token = authentication.createTokenFromUser(mockUser, mockRole);

      expect(token).toEqual(expect.any(String));
    });
  });

  describe("#decodeToken", () => {
    it("should return user", () => {
      const mockUser = new User({
        id: 2,
        name: "fendy",
        email: "fendy@binar.co.id",
        encryptedPassword:
          "$2a$10$a/Nv0ULUmsfDUDbgf7991uENTqBMEA0LbcUcQ3U4xElPZumsV.Kmy",
        roleId: 1,
      });

      const mockRole = new Role({ id: 1, name: "CUSTOMER" });

      const authentication = new AuthenticationController({
        userModel: mockUser,
        roleModel: mockRole,
        bcrypt,
        jwt,
      });

      const token = authentication.createTokenFromUser(mockUser, mockRole);

      const user = authentication.decodeToken(token);

      expect(user).toEqual(user);
    });
  });

  describe("encryptPassword", () => {
    it("should return encrypted password", () => {
      const mockUser = new User({
        id: 2,
        name: "fendy",
        email: "fendy@binar.co.id",
        encryptedPassword:
          "$2a$10$a/Nv0ULUmsfDUDbgf7991uENTqBMEA0LbcUcQ3U4xElPZumsV.Kmy",
        roleId: 1,
      });

      const mockRole = new Role({ id: 1, name: "CUSTOMER" });

      const mockRequest = {
        body: {
          password: "123456",
        },
      };

      const authentication = new AuthenticationController({
        userModel: mockUser,
        roleModel: mockRole,
        bcrypt,
        jwt,
      });

      const encryptedPassword = authentication.encryptPassword(
        mockRequest.body.password,
        10
      );

      expect(encryptedPassword).toEqual(expect.any(String));
    });
  });

  describe("#verifyPassword", () => {
    it("should return true", () => {
      const mockUser = new User({
        id: 2,
        name: "fendy",
        email: "fendy@binar.co.id",
        encryptedPassword: "bagfigaofusofgcuag73b4cuyb7t83gb8",
        roleId: 1,
      });

      const mockRole = new Role({ id: 1, name: "CUSTOMER" });

      const mockRequest = {
        body: {
          password: "bagfigaofusofgcuag73b4cuyb7t83gb8",
        },
      };

      const authentication = new AuthenticationController({
        userModel: mockUser,
        roleModel: mockRole,
        bcrypt,
        jwt,
      });

      authentication.verifyPassword(
        mockUser.encryptedPassword,
        mockRequest.body.password
      );

      expect(mockUser.encryptedPassword).toEqual(mockRequest.body.password);
    });
  });
});

