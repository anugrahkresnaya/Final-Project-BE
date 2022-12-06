const ApplicationController = require('./ApplicationController');

const generateRandomInt = (min = 1, max = 5) => {
  let diff = max - min;
  let random = Math.random();
  random = Math.floor(random * diff);
  random = random + min;
  return random;
}

class TicketController extends ApplicationController {
  constructor({ ticketsModel, airplaneModel, airportModel }) {
    super();
    this.ticketsModel = ticketsModel;
    this.airportModel = airportModel;
    this.airplaneModel = airplaneModel;
  }

  handleCreateTicket = async (req, res) => {
    try {
      const {
        price,
        category,
        origin,
        destination
      } = req.body;

      const airplane = await this.airplaneModel.findByPk(generateRandomInt());
      const airplaneName = airplane.dataValues.name;

      const ticket = await this.ticketsModel.create({
        departure_time: new Date(),
        arrival_time: new Date(),
        price,
        category,
        airplane_name: airplaneName,
        origin,
        destination,
      });

      res.status(201).json({
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
      data : ticket,
      });
  }

  handleUpdateTicket = async (req, res) => {
    try {
      const {
        departure_time,
        arrival_time,
        price,
        category,
      } = req.body;

      const ticket = await this.getTicketFromRequest(req);

      await ticket.update({
        departure_time,
        arrival_time,
        price,
        category,
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
      data : tickets,
      });
  }

  getTicketFromRequest(req) {
    return this.ticketsModel.findByPk(req.params.id)
  }
}

module.exports = TicketController;
