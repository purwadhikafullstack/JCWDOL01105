require('dotenv').config();
const { User, User_Profile } = require('../models');
const bcrypt = require('bcrypt');
const { createSendToken } = require('../utils/tokenUtils');
const {
  verifyEmail,
  sendVerificationCode,
} = require('../utils/verificationUser');
const {
  mailVerificationCode,
  mailResetPasswordLink,
} = require('../utils/sendMail');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone_number } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'Passwords must match',
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      phone_number,
    });

    await User_Profile.create({
      user_id: newUser.id,
    });

    await mailVerificationCode(email, newUser.verification_code, 'user');
    createSendToken(newUser, 201, res, 'user', 'user_role');
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
    const type = req.body.email_or_phone_type;

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
      password.trim(),
      user.password,
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email dan password tidak cocok',
      });
    }

    // Autentikasi berhasil, kirim token atau lakukan sesuai kebutuhan aplikasi
    createSendToken(user, 200, res, 'user', 'user_role'); // Fungsi untuk membuat dan mengirim token kepada user
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

const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = await user.generateResetPasswordToken();
    await mailResetPasswordLink(email, resetToken, 'user');

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
    const user = await User.findOne({ where: { reset_password_token: token } });

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

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.user.id; // Ambil ID pengguna dari token atau sesi

    // Validasi input
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua kolom harus diisi',
      });
    }

    // Ambil data pengguna dari database
    const user = await User.findByPk(userId);

    const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordMatch) {
      return res.status(401).json({
        status: 'fail',
        message: 'Password lama tidak cocok',
      });
    }

    // Validasi newPassword dan confirmNewPassword
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password baru dan konfirmasi password baru tidak cocok',
      });
    }

    // Enkripsi dan simpan newPassword
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Password berhasil diubah',
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({
      status: 'fail',
      message: 'Terjadi kesalahan saat mengubah password',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmailUser,
  resendVerificationCodeUSer,
  requestResetPassword,
  resetPassword,
  changePassword,
};
