const { User, User_Profile } = require('../models');
const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

const updateOrCreateProfile = async (req, res) => {
  try {
    const { name, email, gender, birthday } = req.body;
    const userId = req.user.id;

    await sequelize.transaction(async (t) => {
      let userProfile = await User_Profile.findOne({
        where: { user_id: userId },
        transaction: t,
      });

      let message = '';

      if (userProfile) {
        if (gender) userProfile.gender = gender;
        if (birthday) userProfile.birthday = birthday;

        await userProfile.save({ transaction: t });
        message = 'Profile updated successfully';
      } else {
        userProfile = await User_Profile.create(
          {
            user_id: userId,
            name,
            email,
            gender,
            birthday,
          },
          { transaction: t },
        );
        message = 'Profile created successfully';
      }

      let user = await User.findOne({
        where: { id: userId },
        transaction: t,
      });

      if (user) {
        // Update field yang ada dalam permintaan
        if (name) user.name = name;
        if (email) user.email = email;

        await user.save({ transaction: t });
        message = 'User data updated successfully';
      }

      // Ambil data user dari tabel User
      const userData = await User.findOne({
        where: { id: userId },
        attributes: ['id', 'name', 'email'],
        transaction: t,
      });

      return res.status(200).json({
        status: 'success',
        data: {
          id: userProfile.id,
          name: userData.name,
          email: userData.email,
          gender: userProfile.gender,
          birthday: userProfile.birthday,
        },
        message,
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userProfile = await User_Profile.findOne({
      where: { user_id: userId },
      include: { model: User, attributes: ['id', 'name', 'email'] },
    });

    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const { name, email } = userProfile.User;

    return res.status(200).json({
      status: 'success',
      data: {
        id: userProfile.id,
        name,
        email,
        gender: userProfile.gender,
        birthday: userProfile.birthday,
        profilePicture: userProfile.profile_picture,
      },
      message: 'Profile retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: error.message });
  }
};

// profileController.js

const uploadProfile = async (req, res) => {
  try {
    const idUser = req.user.id;
    let ProfileData = await User_Profile.findOne({
      where: { user_id: idUser },
    });
    if (!ProfileData) {
      ProfileData = await User_Profile.create({
        user_id: idUser,
      });
    }
    // request file
    const file = req.file;
    if (!file) {
      res.status(400);
      throw new Error('image harus di input');
    }
    if (ProfileData.profile_picture) {
      const oldImagePath = ProfileData.profile_picture;
      const oldImageName = path.basename(oldImagePath);
      const oldImagePathOnServer = path.join(
        __dirname,
        `../public/profile/${oldImageName}`,
      );

      fs.unlink(oldImagePathOnServer, (err) => {
        if (err) {
          res.status(400);
          throw new Error('file tidak ditemukan atau gagal dihapus');
        }
      });
    }
    // simpan file baru
    const fileNewImage = file.filename;
    const basePath = `${req.protocol}://${req.get(
      'host',
    )}/src/public/profile/${fileNewImage}`;

    // update image profile
    await ProfileData.update(
      {
        profile_picture: basePath,
      },
      {
        where: {
          id: ProfileData.id,
        },
      },
    );

    return res.status(200).json({
      status: 'success',
      message: 'image uploaded successfully',
      data: {
        profile_picture: basePath,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const getProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;

    const userProfile = await User_Profile.findOne({
      where: { user_id: userId },
      attributes: ['profile_picture'],
    });
    if (!userProfile || !userProfile.profile_picture) {
      return res.status(404).json({ error: 'Profile picture not found' });
    }
    return res.status(200).json({
      status: 'success',
      profile_picture: userProfile.profile_picture,
      message: 'Profile picture retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: error.message });
  }
};

module.exports = {
  updateOrCreateProfile,
  getProfile,
  uploadProfile,
  getProfilePicture,
};
