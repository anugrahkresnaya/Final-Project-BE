const ApplicationController = require('./ApplicationController');

class NotificationController extends ApplicationController {
  constructor({ notificationsModel, ordersModel }) {
    super();
    this.notificationsModel = notificationsModel;
    this.ordersModel = ordersModel;
  }

  handleCreateNotification = async (req, res) => {
    try {
      const {
        orderId,
      } = req.body
      const notification = await this.notificationsModel.create({
        orderId,
        userId: req.user.id
      });

      res.status(201).json({
        status: 'success',
        message: 'Notification added successfully',
        data: notification,
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
}
