const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new Error();
    }

    req.user = {
      id: user.id,
      role: decoded.role,
    };
    res.status(200).json({
      status: 'success',
      user: {
        id: user.id,
        role: decoded.role,
      },
    });

    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Cannot access. Please authenticate as a user.',
    });
  }
};

module.exports = authenticateUser;
