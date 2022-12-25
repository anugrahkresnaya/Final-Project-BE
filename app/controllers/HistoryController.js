const ApplicationController = require('./ApplicationController');

class HistoryController extends ApplicationController {
  constructor({ ordersModel }) {
    super();
    this.ordersModel = ordersModel;
  }

  handleGetListHistory = async (req, res) => {
    const orders = await this.ordersModel.findAll();

    res.status(200).json({
      status: 'success',
      message: 'Successfully get history list',
      data: orders,
    })
  }

  handleGetHistoryById = async (req, res) => {
    const order = await this.getHistoryFromRequest(req);

    res.status(200).json({
      status: "success",
      message: "History data fetched successfully",
      data: order,
    });
  }

  getHistoryFromRequest(req) {
    return this.ordersModel.findByPk(req.params.id);
  }
}

module.exports = HistoryController;