'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Tickets, {
        foreignKey: "origin",
      })

      this.hasOne(models.Tickets, {
        foreignKey: "destination",
      })
    }

    toJSON() {
      return {
        id: this.id,
        name: this.name,
        city: this.city,
        country: this.country,
        country_code: this.country_code,
        createdAt: this.createdAt,
        updatedAt: this.updateAt,
      }
    }
  }
  Airport.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    country_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};
