'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const {
  generateVerificationCode,
  generateResetToken,
} = require('../utils/sendMail');

module.exports = (sequelize, DataTypes) => {
  class Tenants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tenants.hasMany(models.Properties, {
        foreignKey: 'tenant_id',
      });
    }
    async generateResetPasswordToken() {
      this.reset_password_token = generateResetToken();
      this.reset_password_expires = new Date();
      this.reset_password_expires.setMinutes(
        this.reset_password_expires.getMinutes() + 30,
      ); // Token berlaku selama 30 menit
      await this.save();
      return this.reset_password_token;
    }
    async generateResetPasswordToken() {
      this.reset_password_token = generateResetToken();
      this.reset_password_expires = new Date();
      this.reset_password_expires.setMinutes(
        this.reset_password_expires.getMinutes() + 30,
      ); // Token berlaku selama 30 menit
      await this.save();
      return this.reset_password_token;
    }
  }
  Tenants.init(
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
      idCard_number: DataTypes.FLOAT,
      id_picture: DataTypes.STRING,
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
      new_password: {
        type: DataTypes.STRING,
      },
      reset_password_token: {
        type: DataTypes.STRING,
      },
      reset_password_expires: {
        type: DataTypes.DATE,
      },
    },
    {
      hooks: {
        beforeCreate: async (tenant) => {
          // untuk enkripsi password
          if (tenant.password) {
            const salt = await bcrypt.genSalt(10);
            tenant.password = bcrypt.hashSync(tenant.password, salt);
          }
          tenant.verification_code = generateVerificationCode();
          tenant.verification_expires = new Date();
          tenant.verification_expires.setMinutes(
            tenant.verification_expires.getMinutes() + 2,
          );
        },
      },
      sequelize,
      modelName: 'Tenants',
    },
  );
  return Tenants;
};
