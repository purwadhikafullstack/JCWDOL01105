const jwt = require('jsonwebtoken');
const { Tenants } = require('../models');

const authenticateTenant = async (req, res, next) => {
  try {
    // Check if the user is a tenant
    if (req.user && req.user.role === 'tenant') {
      // Dapatkan token dari header
      const token = req.header('Authorization').replace('Bearer ', '');

      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Cari tenant berdasarkan ID dalam token
      const tenant = await Tenant.findOne({
        where: { id: decoded.id, new_password: null },
      });

      if (!tenant) {
        throw new Error();
      }

      // Tambahkan informasi tenant ke request
      req.user = {
        id: tenant.id,
        role: decoded.role,
      };

      next(); // Lanjutkan ke endpoint
    } else {
      // If not a tenant, proceed to the next middleware or route handler
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Tidak dapat mengakses. Harap autentikasi sebagai tenant.',
    });
  }
};

module.exports = authenticateTenant;
