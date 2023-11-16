'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SalesReport.init({
    tenant_id: DataTypes.INTEGER,
    property_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    sales_date: DataTypes.DATE,
    total_sales_amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'SalesReport',
  });
  return SalesReport;
};