const { Tenants } = require('../models');
const { createSendToken } = require('../utils/tokenUtils');
const {
  verifyEmail,
  sendVerificationCode,
} = require('../utils/verificationTenant');
const bcrypt = require('bcrypt');
const {
  mailVerificationCode,
  mailResetPasswordLink,
} = require('../utils/sendMail');

const registerTenant = async (req, res) => {
  try {
    const { name, email, password, phone_number, idCard_number } = req.body;

    const file = req.file;
    if (!file) {
      res.status(400);
      throw new Error('id card image is required');
    }
    const fileNewImage = file.filename;
    const basePath = `${req.protocol}://${req.get(
      'host',
    )}/src/public/id_card/${fileNewImage}`;

    const newTenant = await Tenants.create({
      name,
      email,
      password,
      phone_number,
      idCard_number,
      id_picture: basePath,
    });

    await mailVerificationCode(email, newTenant.verification_code, 'tenant');
    createSendToken(newTenant, 201, res, 'tenant', 'tenant_role');
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const loginTenant = async (req, res) => {
  try {
    const { email, password } = req.body;
    let tenant = await Tenants.findOne({ where: { email } });
    if (!tenant) {
      return res.status(400).json({
        status: 'fail',
        message: 'Tenant tidak ditemukan',
      });
    }

    if (!tenant.is_verified) {
      return res.status(400).json({
        status: 'fail',
        message: 'Akun belum terverifikasi',
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, tenant.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        status: 'fail',
        message: 'Email dan password tidak cocok',
      });
    }

    createSendToken(tenant, 200, res, 'tenant', 'tenant_role');
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const verifyEmailTenant = async (req, res) => {
  try {
    const result = await verifyEmail(req, res);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const resendVerificationCodeTenant = async (req, res) => {
  try {
    const result = await sendVerificationCode(req, res);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const tenant = await Tenants.findOne({ where: { email } });
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    const resetToken = await tenant.generateResetPasswordToken();
    await mailResetPasswordLink(email, resetToken, 'tenant');

    return res
      .status(200)
      .json({ message: 'Reset password email sent successfully' });
  } catch (error) {
    console.error('Error requesting reset password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword: plainNewPassword } = req.body;

    // Temukan pengguna berdasarkan token
    const user = await Tenants.findOne({
      where: { reset_password_token: token },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Token reset password tidak valid' });
    }

    // Hash password baru
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(plainNewPassword, saltRounds);

    // Perbarui kata sandi pengguna
    user.password = hashedNewPassword;
    user.reset_password_token = null;
    await user.save();

    return res.status(200).json({ message: 'Kata sandi berhasil diubah' });
  } catch (error) {
    return res.status(500).json({ message: 'Gagal mengubah kata sandi' });
  }
};

module.exports = {
  registerTenant,
  loginTenant,
  verifyEmailTenant,
  resendVerificationCodeTenant,
  requestResetPassword,
  resetPassword,
};
