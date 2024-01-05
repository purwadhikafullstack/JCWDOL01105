'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      this.belongsTo(models.Property, {
        foreignKey: 'property_id',
        as: 'property',
      });
    }
  }
  Reviews.init(
    {
      user_id: DataTypes.UUID,
      property_id: DataTypes.UUID,
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Reviews',
    },
  );
  return Reviews;
};
