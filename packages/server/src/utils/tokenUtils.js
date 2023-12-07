const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, // Pastikan format yang benar
  });
};

const createSendToken = (user, statusCode, res, userType, role) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  let userDataToSend = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    role,
  };

  if (userType === 'tenant') {
    userDataToSend.idCard_number = user.idCard_number;
    // Tambahkan atribut lain yang dimiliki oleh tenant
  }

  res.status(statusCode).json({
    status: 'success',
    token,
    data: userDataToSend,
  });
};

module.exports = {
  signToken,
  createSendToken,
};
