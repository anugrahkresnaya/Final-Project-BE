const ApplicationController = require('./ApplicationController');

class WishlistController extends ApplicationController {
  constructor({ wishlistModel, ticketsModel }) {
    super();
    this.wishlistModel = wishlistModel;
    this.ticketsModel = ticketsModel;
  }

  handleCreateWishlist = async (req, res) => {
    try {
      const ticket = await this.getTicketFromRequest(req);

      const user = req.user.id;
      console.log('id user: ', user);

      const wishlist = await this.wishlistModel.create({
        ticketId: ticket.id,
        userId: user,
      })

      res.status(201).json({
        status: 'success',
        message: 'Wishlist successfully added',
        data: wishlist
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

  handleGetWishlistList = async (req, res) => {
    const wishlists = await this.wishlistModel.findAll();

    res.status(200).json({
      status: "success",
      message: "Wishlist list data fetched successfully",
      data: wishlists
    });
  }

  handleGetWishlistById = async (req, res) => {
    const wishlist = await this.getWishlistFromRequest(req);

    res.status(200).json({
      status: "success",
      message: "Wishlist data fetched successfully",
      data: wishlist
    });
  }

  handleDeleteWishlist = async (req, res) => {
    const wishlist = await this.getWishlistFromRequest(req);
    await wishlist.destroy();

    res.status(200).json({
      status: "success",
      message: "Wishlist successfully deleted"
    })
  }

  getTicketFromRequest(req) {
    return this.ticketsModel.findByPk(req.params.id);
  }

  getWishlistFromRequest(req) {
    return this.wishlistModel.findByPk(req.params.id);
  }
}

module.exports = WishlistController;
