const { Tenant } = require('../models');
const {
  generateVerificationCode,
  mailVerificationCode,
} = require('./sendMail');

const verifyEmail = async (req, res) => {
  try {
    const { verification_code } = req.body;

    console.log('Kode verifikasi yang diterima:', verification_code);

    const tenant = await Tenant.findOne({ where: { verification_code } });
    if (!tenant) {
      return res.status(404).json({
        status: 'fail',
        message: 'Verifikasi Gagal, Cek Kembali Kode Verifikasi',
      });
    }
    if (tenant.is_verified) {
      return res.status(400).json({
        status: 'fail',
        message: 'Akun sudah terverifikasi',
      });
    }
    if (tenant.verification_code !== verification_code) {
      return res.status(400).json({
        status: 'fail',
        message: 'Kode verifikasi tidak cocok',
      });
    }

    const currentDate = new Date();
    if (currentDate > tenant.verification_expires) {
      return res.status(400).json({
        status: 'fail',
        message: 'Kode verifikasi sudah kedaluwarsa',
      });
    }
    await tenant.update({ is_verified: true });
    return res.status(200).json({
      status: 'success',
      message: 'Akun berhasil diverifikasi',
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return res.status(500).json({
      status: 'fail',
      message: `Terjadi kesalahan saat memproses permintaan: ${error.message}`,
    });
  }
};

const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const tenant = await Tenant.findOne({ where: { email } });
    if (!tenant) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tenant tidak ditemukan',
      });
    }
    if (tenant.is_verified) {
      return res.status(400).json({
        status: 'fail',
        message: 'Akun sudah terverifikasi',
      });
    }
    if (tenant.verification_attempts >= 5) {
      return res.status(400).json({
        status: 'fail',
        message: 'Maksimal percobaan kirim kode verifikasi telah habis',
      });
    }
    await tenant.increment('verification_attempts');
    tenant.verification_code = generateVerificationCode();
    tenant.verification_expires = new Date(
      new Date().getTime() + 5 * 60 * 1000,
    );

    await tenant.save();
    await mailVerificationCode(
      tenant.email,
      tenant.verification_code,
      'tenant',
    );

    return res.status(200).json({
      status: 'success',
      message: 'Kode verifikasi berhasil dikirim ulang',
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return res.status(500).json({
      status: 'fail',
      message: `Terjadi kesalahan saat memproses permintaan: ${error.message}`,
    });
  }
};

module.exports = {
  verifyEmail,
  sendVerificationCode,
};
