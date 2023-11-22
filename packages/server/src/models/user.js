'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { generateVerificationCode } = require('../utils/sendMail');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verification_code: {
        type: DataTypes.STRING,
      },
      verification_expires: {
        type: DataTypes.DATE,
      },
      verification_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          // untuk enkripsi password
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }
          user.verification_code = generateVerificationCode();
          user.verification_expires = new Date();
          user.verification_expires.setMinutes(
            user.verification_expires.getMinutes() + 2,
          );
        },
      },
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
