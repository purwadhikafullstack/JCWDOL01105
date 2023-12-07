'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Property, {
        through: 'properties',
        foreignKey: 'tenant_id',
        otherKey: 'id',
      });
    }
  }
  Tenant.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      idCard_number: DataTypes.FLOAT,
      id_picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tenant',
    },
  );
  return Tenant;
};
