'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });

      this.belongsTo(models.Tickets, {
        foreignKey: "ticketId",
      });
    }
  }
  Wishlist.init({
    ticketId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    destroyedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Wishlist',
    paranoid: true,
    deletedAt: 'destroyedAt'
  });
  return Wishlist;
};
