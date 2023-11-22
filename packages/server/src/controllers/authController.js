require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createSendToken } = require('../utils/tokenUtils');
const { verifyEmail, sendVerificationCode } = require('../utils/verification');
const { mailVerificationCode } = require('../utils/sendMail');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone_number } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'Passwords do not match',
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      phone_number,
    });

    await mailVerificationCode(email, newUser.verification_code);
    createSendToken(newUser, 201, res);
  } catch (error) {
    return res.status(500).json({
      status: error.message,
      message: 'Internal server error',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email_or_phone, password } = req.body;
    const type = req.body.email_or_phone_type; // Mengambil tipe email/phone_number yang telah disimpan di middleware

    let user;

    if (type === 'email') {
      user = await User.findOne({ where: { email: email_or_phone } });
    } else if (type === 'phone_number') {
      user = await User.findOne({ where: { phone_number: email_or_phone } });
    }

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User tidak ditemukan',
      });
    }

    if (!user.is_verified) {
      return res.status(400).json({
        status: 'fail',
        message: 'Akun belum terverifikasi',
      });
    }

    // Verifikasi kata sandi
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.new_password || user.password,
    );

    if (!isPasswordMatch) {
      return res.status(404).json({
        status: 'fail',
        message: 'Email dan password tidak cocok',
      });
    }

    // Autentikasi berhasil, kirim token atau lakukan sesuai kebutuhan aplikasi
    createSendToken(user, 200, res); // Fungsi untuk membuat dan mengirim token kepada user
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

const verifyEmailUser = async (req, res) => {
  try {
    const result = await verifyEmail(req, res);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const resendVerificationCodeUSer = async (req, res) => {
  try {
    const result = await sendVerificationCode(req, res);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmailUser,
  resendVerificationCodeUSer,
};
