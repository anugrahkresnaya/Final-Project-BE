const ApplicationController = require('./ApplicationController');

class AirplaneController extends ApplicationController {
  constructor({ airplaneModel }) {
    super();
    this.airplaneModel = airplaneModel;
  }

  handleCreateAirplane = async (req, res) => {
    try {
      const {
        name,
        code,
        country
      } = req.body;

      const airplane = await this.airplaneModel.create({
        name,
        code,
        country
      });

      res.status(201).json(airplane);
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      })
    }
  }

  handleGetAirplane = async (req, res) => {
    const airplane = await this.getAirplaneFromRequest(req);

    res.status(200).json(airplane);
  }

  handleUpdateAirplane = async (req, res) => {
    try {
      const {
        name,
        code,
        country
      } = req.body;

      const airplane = await this.getAirplaneFromRequest(req);
      
      await airplane.update({
        name,
        code,
        country
      });

      res.status(200).json(airplane);
    } catch (error) {
      res.status(422).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  }

  handleDeleteAirplane = async (req, res) => {
    const airplane = await this.getAirplaneFromRequest(req);
    await airplane.destroy();

    res.status(204).end();
  }

  handleListAirplane = async (req, res) => {
    const airplanes = await this.airplaneModel.findAll();

    res.status(200).json(airplanes);
  }

  getAirplaneFromRequest(req) {
    return this.airplaneModel.findByPk(req.params.id);
  }
}

module.exports = AirplaneController;