const jwt = require('jsonwebtoken');
const { Tenants } = require('../models');

const authenticateTenant = async (req, res, next) => {
  try {
    // Dapatkan token dari header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Cari tenant berdasarkan ID dalam token
    const tenant = await Tenants.findOne({
      where: { id: decoded.id, new_password: null },
    });

    if (!tenant) {
      throw new Error();
    }

    // Tambahkan informasi tenant ke request
    req.user = tenant;

    next(); // Lanjutkan ke endpoint
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Tidak dapat mengakses. Harap autentikasi sebagai tenant.',
    });
  }
};

module.exports = authenticateTenant;
