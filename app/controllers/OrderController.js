const ApplicationController = require('./ApplicationController');

class OrderController extends ApplicationController {
  constructor({ ordersModel }) {
    super();
    this.ordersModel = ordersModel;
  }

  handleGetListOrder = async (req, res) => {
    const orders = await this.ordersModel.findAll();

    res.status(200).json({
      status: 'success',
      message: 'Successfully get order list',
      data: orders,
    })
  }
}

module.exports = OrderController;
