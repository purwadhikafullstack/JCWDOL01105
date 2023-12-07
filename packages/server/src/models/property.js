'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tenant, {
        foreignKey: 'tenant_id',
        as: 'tenant',
      });
    }
  }
  Property.init(
    {
      tenant_id: DataTypes.UUID,
      category_id: DataTypes.UUID,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      pictures: DataTypes.STRING,
      description: DataTypes.TEXT,
      avg_rating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Property',
    },
  );
  return Property;
};
