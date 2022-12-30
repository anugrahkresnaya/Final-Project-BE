const ApplicationController = require('./ApplicationController');

class NotificationController extends ApplicationController {
  constructor({ notificationsModel, ordersModel }) {
    super();
    this.notificationsModel = notificationsModel;
    this.ordersModel = ordersModel;
  }

  handleGetNotificationList = async (req, res) => {
    const notifications = await this.notificationsModel.findAll();

    res.status(200).json({
      status: 'success',
      message: 'Successfully get notification list',
      data: notifications,
    });
  }
}

module.exports = NotificationController;
