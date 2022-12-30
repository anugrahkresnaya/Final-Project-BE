const ApplicationController = require('./ApplicationController');

// const generateRandomInt = (min = 1, max = 5) => {
//   let diff = max - min;
//   let random = Math.random();
//   random = Math.floor(random * diff);
//   random = random + min;
//   return random;
// }

class TicketController extends ApplicationController {
  constructor({
    ticketsModel,
    airplaneModel,
    airportModel,
    ordersModel,
    notificationsModel
  }) {
    super();
    this.ticketsModel = ticketsModel;
    this.airportModel = airportModel;
    this.airplaneModel = airplaneModel;
    this.ordersModel = ordersModel;
    this.notificationsModel = notificationsModel;
  }

  handleCreateTicket = async (req, res) => {
    try {
      let {
        departure_time,
        arrival_time,
        return_time,
        arrival2_time,
        price,
        category,
        airplane_name,
        origin,
        destination,
      } = req.body;
      console.log('return_time : ', return_time)
      console.log('arrival2: ', arrival2_time)

      // const airplane = await this.airplaneModel.findByPk(generateRandomInt());
      // const airplaneName = airplane.dataValues.name;

      if (return_time !== undefined) {
        return_time = new Date(return_time)
      }

      if (arrival2_time !== undefined) {
        arrival2_time = new Date(arrival2_time)
        
      }

      const ticket = await this.ticketsModel.create({
        departure_time: new Date(departure_time),
        arrival_time: new Date(arrival_time),
        return_time: return_time,
        arrival2_time: arrival2_time,
        price,
        category,
        airplane_name,
        origin,
        destination,
        createdBy : req.user.id,
      });

      res.status(200).json({
        status: 'success',
        message: 'Ticket data added successfully',
        data: ticket,
      })
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      })
    }
  }

  handleGetTicket = async (req, res) => {
    const ticket = await this.getTicketFromRequest(req);

    res.status(200).json({
      status: "success",
      message: "get ticket successful",
      data: ticket,
    });
  }

  handleUpdateTicket = async (req, res) => {
    try {
      const {
        departure_time,
        arrival_time,
        return_time,
        arrival2_time,
        price,
        category,
        origin,
        destination,
      } = req.body;

      const ticket = await this.getTicketFromRequest(req);

      await ticket.update({
        departure_time,
        arrival_time,
        return_time,
        arrival2_time,
        price,
        category,
        origin,
        destination,
        updatedBy: req.user.id
      });

      res.status(200).json({
        status: 'success',
        message: 'Ticket data updated successfully',
        data: ticket,
      })
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message,
        }
      })
    }
  }

  handleDeleteTicket = async (req, res) => {
    const ticket = await this.getTicketFromRequest(req);
    await ticket.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Ticket data deleted successfully',
    });
  }

  handleListTickets = async (req, res) => {
    const tickets = await this.ticketsModel.findAll();

    res.status(200).json({
      status: "success",
      message: "get ticket list successful",
      data: tickets,
    });
  }

  handleOrderTicket = async (req, res, next) => {
    try {
      const ticket = await this.getTicketFromRequest(req);

      const order = await this.ordersModel.create({
        userId: req.user.id,
        ticketId: ticket.id,
        order_date: new Date(),
      });

      await this.notificationsModel.create({
        userId: req.user.id,
        orderId: order.id,
      })

      res.status(201).json(order)
    } catch (error) {
      next(error);
    }
  }

  getTicketFromRequest(req) {
    return this.ticketsModel.findByPk(req.params.id)
  }
}

module.exports = TicketController;
