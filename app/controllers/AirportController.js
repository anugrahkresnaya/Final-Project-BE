const ApplicationController = require('./ApplicationController');

class AirportController extends ApplicationController {
  constructor({ airportModel }) {
    super();
    this.airportModel = airportModel;
  }

  handleCreateAirport = async (req, res) => {
    try {
      const {
        name,
        city,
        country,
        country_code
      } = req.body;

      const airport = await this.airportModel.create({
        name,
        city,
        country,
        country_code
      });

      res.status(200).json({
        status: "success",
        message: "airport added successfully",
        data : airport,
      });
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      })
    }
  }

  handleGetAirport = async (req, res) => {
    const airport = await this.getAirportFromRequest(req);

    res.status(200).json({
      status: "success",
      message: "get airport data successfull",
      data : airport,
    });
  }

  handleUpdateAirport = async (req, res) => {
    try {
      const {
        name,
        city,
        country,
        country_code
      } = req.body;

      const airport = await this.getAirportFromRequest(req);

      await airport.update({
        name,
        city,
        country,
        country_code
      });

      res.status(200).json({
        status: "success",
        message: "airport updated successfully",
        data : airport,
      });
    } catch (err) {
      res.status(422).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  }

  handleDeleteAirport = async (req, res) => {
    const airport = await this.getAirportFromRequest(req);
    await airport.destroy();
    
    res.status(200).json({
      status: 'success',
      message: 'airport data deleted successfully',
    });
  }

  handleListAirport = async (req, res) => {
    const airports = await this.airportModel.findAll()

    res.status(200).json({
      status: "success",
      message: "get airports list successfull",
      data : airports,
    });
  }

  getAirportFromRequest(req) {
    return this.airportModel.findByPk(req.params.id);
  }
}

module.exports = AirportController;