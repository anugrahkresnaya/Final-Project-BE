'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Tickets, {
        foreignKey: "airplane_name",
      })
    }

    toJSON() {
      return {
        id: this.id,
        name: this.name,
        code: this.code,
        country: this.country,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      }
    }
  }
  Airplane.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};
