'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey: "airplane_name",
      });

      this.belongsTo(models.Airport, {
        foreignKey: "origin"
      });

      this.belongsTo(models.Airport, {
        foreignKey: "destination",
      });
    }
  }
  Tickets.init({
    airplane_name: DataTypes.STRING,
    departure_time: DataTypes.DATE,
    arrival_time: DataTypes.DATE,
    return_time: DataTypes.DATE,
    arrival2_time: DataTypes.DATE,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tickets',
  });
  return Tickets;
};
