// const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uploader = require('./middleware/uploader')
const {
  ApplicationController,
  AuthenticationController,
  AirportController,
  AirplaneController,
  TicketController
} = require("./controllers");
const {
  User,
  Role,
  Airport,
  Airplane,
  Tickets,
} = require("./models");

function apply(app) {
  const roleModel = Role;
  const userModel = User;
  const airportModel = Airport;
  const airplaneModel = Airplane;
  const ticketsModel = Tickets;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, roleModel, userModel, });
  const airportController = new AirportController({ airportModel });
  const airplaneController = new AirplaneController({ airplaneModel });
  const ticketController = new TicketController({ ticketsModel, airplaneModel, airportModel });

  const accessControl = authenticationController.accessControl;

  app.get("/", applicationController.handleGetRoot);

  app.post("/api/v1/airports/add", airportController.handleCreateAirport);
  app.get("/api/v1/airports", airportController.handleListAirport);
  app.get("/api/v1/airports/:id", airportController.handleGetAirport);
  app.put("/api/v1/airports/update/:id", airportController.handleUpdateAirport);
  app.delete("/api/v1/airports/delete/:id", airportController.handleDeleteAirport);

  app.post("/api/v1/airplanes/add", airplaneController.handleCreateAirplane);
  app.get("/api/v1/airplanes/:id", airplaneController.handleGetAirplane);
  app.put("/api/v1/airplanes/update/:id", airplaneController.handleUpdateAirplane);
  app.delete("/api/v1/airplanes/delete/:id", airplaneController.handleDeleteAirplane);
  app.get("/api/v1/airplanes", airplaneController.handleListAirplane);

  app.post("/api/v1/tickets/add", authenticationController.authorize(accessControl.ADMIN), ticketController.handleCreateTicket);
  app.get("/api/v1/tickets/:id", ticketController.handleGetTicket);
  app.put("/api/v1/tickets/update/:id", authenticationController.authorize(accessControl.ADMIN), ticketController.handleUpdateTicket);
  app.delete("/api/v1/tickets/delete/:id", authenticationController.authorize(accessControl.ADMIN), ticketController.handleDeleteTicket);
  app.get("/v1/tickets", ticketController.handleListTickets);

  app.post("/api/auth/login", authenticationController.handleLogin);
  app.post("/api/auth/register", authenticationController.handleRegister);
  app.get("/api/auth/user", authenticationController.authorize(accessControl.CUSTOMER && accessControl.ADMIN), authenticationController.handleGetUser);
  app.get("/api/v1/users", authenticationController.handleListUser);
  app.put("/api/v1/user/update/:id", uploader.single("photoProfile"), authenticationController.handleUpdateUser);

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply, }
