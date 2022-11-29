// const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uploader = require('./middleware/uploader')
const {
  ApplicationController,
  AuthenticationController,
  UserController,
  AirportController,
  AirplaneController
} = require("./controllers");
const {
  User,
  Role,
  Airport,
  Airplane
} = require("./models");

function apply(app) {
  const roleModel = Role;
  const userModel = User;
  const airportModel = Airport;
  const airplaneModel = Airplane;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, roleModel, userModel, });
  const userController = new UserController({ userModel });
  const airportController = new AirportController({ airportModel });
  const airplaneController = new AirplaneController({ airplaneModel });

  const accessControl = authenticationController.accessControl;

  app.get("/", applicationController.handleGetRoot);

  app.post("/api/v1/airports", airportController.handleCreateAirport);
  app.get("/api/v1/airports", airportController.handleListAirport);
  app.get("/api/v1/airports/:id", airportController.handleGetAirport);
  app.put("/api/v1/airports/:id", airportController.handleUpdateAirport);
  app.delete("/api/v1/airports/:id", airportController.handleDeleteAirport);

  app.post("/api/v1/airplanes", airplaneController.handleCreateAirplane);
  app.get("/api/v1/airplanes/:id", airplaneController.handleGetAirplane);
  app.put("/api/v1/airplanes/:id", airplaneController.handleUpdateAirplane);
  app.delete("/api/v1/airplanes/:id", airplaneController.handleDeleteAirplane);
  app.get("/api/v1/airplanes", airplaneController.handleListAirplane);

  app.post("/api/auth/login", authenticationController.handleLogin);
  app.post("/api/auth/register", authenticationController.handleRegister);
  app.get("/api/auth/user", authenticationController.authorize(accessControl.CUSTOMER), authenticationController.handleGetUser);
  app.put("/api/auth/update_user/:id", uploader.single("photoProfile"), authenticationController.handleUpdateUser);

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply, }
