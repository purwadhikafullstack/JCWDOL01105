'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Properties.belongsTo(models.Tenants, { foreignKey: 'tenant_id' });
      Properties.belongsTo(models.Categories, { foreignKey: 'category_id' });
      Properties.hasMany(models.Room, { foreignKey: 'property_id' });
    }
  }
  Properties.init(
    {
      tenant_id: DataTypes.UUID,
      category_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      pictures: DataTypes.TEXT,
      description: DataTypes.TEXT,
      avg_rating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Properties',
    },
  );
  return Properties;
};
