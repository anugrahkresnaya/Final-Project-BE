'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Routes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Routes.init({
    origin: DataTypes.STRING,
    destination: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Routes',
  });
  return Routes;
};