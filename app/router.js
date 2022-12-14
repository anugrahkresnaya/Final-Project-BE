// const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uploader = require('./middleware/uploader')
const {
  ApplicationController,
  AuthenticationController,
  AirportController,
  AirplaneController,
  TicketController,
  OrderController,
  HistoryController,
  NotificationController,
  WishlistController,
} = require("./controllers");
const {
  User,
  Role,
  Airport,
  Airplane,
  Tickets,
  Orders,
  Notifications,
  Wishlist
} = require("./models");

function apply(app) {
  const roleModel = Role;
  const userModel = User;
  const airportModel = Airport;
  const airplaneModel = Airplane;
  const ticketsModel = Tickets;
  const ordersModel = Orders;
  const notificationsModel = Notifications;
  const wishlistModel = Wishlist;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, roleModel, userModel, });
  const airportController = new AirportController({ airportModel });
  const airplaneController = new AirplaneController({ airplaneModel });
  const ticketController = new TicketController({ ticketsModel, airplaneModel, airportModel, ordersModel, notificationsModel });
  const orderController = new OrderController({ ordersModel });
  const historyController = new HistoryController({ ordersModel });
  const notificationController = new NotificationController({ notificationsModel });
  const wishlistController = new WishlistController({ wishlistModel, ticketsModel });

  const accessControl = authenticationController.accessControl;

  app.get("/", applicationController.handleGetRoot);

  app.post("/api/v1/airports/add", authenticationController.authorize(accessControl.ADMIN), airportController.handleCreateAirport);
  app.get("/api/v1/airports", airportController.handleListAirport);
  app.get("/api/v1/airports/:id", airportController.handleGetAirport);
  app.put("/api/v1/airports/update/:id", authenticationController.authorize(accessControl.ADMIN), airportController.handleUpdateAirport);
  app.delete("/api/v1/airports/delete/:id", authenticationController.authorize(accessControl.ADMIN), airportController.handleDeleteAirport);

  app.post("/api/v1/airplanes/add", authenticationController.authorize(accessControl.ADMIN), airplaneController.handleCreateAirplane);
  app.get("/api/v1/airplanes", airplaneController.handleListAirplane);
  app.get("/api/v1/airplanes/:id", airplaneController.handleGetAirplane);
  app.put("/api/v1/airplanes/update/:id", authenticationController.authorize(accessControl.ADMIN), airplaneController.handleUpdateAirplane);
  app.delete("/api/v1/airplanes/delete/:id", authenticationController.authorize(accessControl.ADMIN), airplaneController.handleDeleteAirplane);

  app.post("/api/v1/tickets/add", authenticationController.authorize(accessControl.ADMIN), ticketController.handleCreateTicket);
  app.get("/api/v1/tickets", ticketController.handleListTickets);
  app.get("/api/v1/tickets/:id", ticketController.handleGetTicket);
  app.put("/api/v1/tickets/update/:id", authenticationController.authorize(accessControl.ADMIN), ticketController.handleUpdateTicket);
  app.delete("/api/v1/tickets/delete/:id", authenticationController.authorize(accessControl.ADMIN), ticketController.handleDeleteTicket);
  app.get("/api/v1/tickets", ticketController.handleListTickets);
  app.post("/api/v1/tickets/:id/order", authenticationController.authorize(accessControl.CUSTOMER), ticketController.handleOrderTicket);

  app.get("/api/v1/orders", orderController.handleGetListOrder);
  app.get("/api/v1/histories", historyController.handleGetListHistory);
  app.get("/api/v1/history/:id", historyController.handleGetHistoryById);

  app.get("/api/v1/Notifications", notificationController.handleGetNotificationList);

  app.post("/api/v1/wishlists/add/:id", authenticationController.authorize(accessControl.CUSTOMER), wishlistController.handleCreateWishlist);
  app.get("/api/v1/wishlists/:id", wishlistController.handleGetWishlistById);
  app.get("/api/v1/wishlists", wishlistController.handleGetWishlistList);
  app.delete("/api/v1/wishlists/delete/:id", authenticationController.authorize(accessControl.CUSTOMER), wishlistController.handleDeleteWishlist);

  app.post("/api/auth/login", authenticationController.handleLogin);
  app.post("/api/auth/register", authenticationController.handleRegister);
  app.get("/api/auth/user", authenticationController.authorize(), authenticationController.handleGetUser);
  
  app.get("/api/v1/users/:id", authenticationController.authorize(), authenticationController.handleGetUserById)
  app.get("/api/v1/users", authenticationController.handleListUser);
  app.put("/api/v1/users/update/:id", uploader.single("photoProfile"), authenticationController.handleUpdateUser);

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply, }
