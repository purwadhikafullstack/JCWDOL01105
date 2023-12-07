const { Property } = require('../models');
const { errorHandler } = require('../utils/errorHandle');

exports.createOrUpdateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address, description } = req.body;
    const tenant_id = req.user ? req.user.tenant_id : null;

    let property;

    if (id) {
      property = await Property.findByPk(id);

      if (!property) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Property not found' });
      }

      property.name = name || property.name;
      property.address = address || property.address;
      property.description = description || property.description;

      if (req.file) {
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get(
          'host',
        )}/src/public/property/${fileName}`;
        property.pictures = basePath;
      }

      await property.save();
    } else {
      const file = req.file;
      if (!file) {
        res.status(400);
        throw new Error('property picture is required');
      }

      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get(
        'host',
      )}/src/public/property/${fileName}`;

      property = await Property.create({
        tenant_id,
        name,
        address,
        description,
        pictures: basePath,
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (error) {
    console.error('Error creating/updating property:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getProperties = async (req, res, next) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json({
      status: 'success',
      data: {
        properties,
      },
    });
  } catch (error) {
    console.error('Error getting properties:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error getting properties',
    });
  }
};

exports.getProperty = async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return next(errorHandler(404, 'Property not found!'));
    }
    res.status(200).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return next(errorHandler(404, 'Property not found!'));
    }

    // tambahkan logic seperti update

    await property.destroy();
    res.status(200).json({
      status: 'success',
      message: 'Property has been deleted!',
    });
  } catch (error) {
    next(error);
  }
};

exports.searchProperties = async (req, res, next) => {
  try {
    const { location, date, guests } = req.query;
    console.log('Search request', req.query);

    const where = {};
    if (location) {
      where.location = location;
    }
    if (date) {
      where.date = date;
    }
    if (guests) {
      where.guests = guests;
    }

    const searchResult = await Property.findAll({ where });

    res.json({ success: true, data: searchResult });
  } catch (error) {
    console.error('Error searching properties', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
