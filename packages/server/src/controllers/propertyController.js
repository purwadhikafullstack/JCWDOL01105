const { Op } = require('sequelize');
const {
  Properties,
  Room,
  sequelize,
  property_picture,
  Tenants,
} = require('../models');

exports.createOrUpdateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      description,
      categories,
      bedrooms,
      bathrooms,
      regularPrice,
      specialPrice,
      offer,
      furnished,
      parking,
      type_room,
      available,
      type,
      room_information,
    } = req.body;

    const isForSale = type === 'Property For Sale';
    const isForRent = type === 'Property For Rent';
    const defaultType = '';

    const tenant_id = req.user ? req.user.id : null;

    let property;

    if (id) {
      property = await Properties.findByPk(id, {
        include: [
          {
            model: Room,
            as: 'rooms',
          },
        ],
      });

      if (!property || property.tenant_id !== tenant_id) {
        return res.status(403).json({
          status: 'error',
          message: 'You do not have permission to update this property',
        });
      }
      property.sell = isForSale;
      property.rent = isForRent;
      property.categories = categories;
      property.address = address;
      property.description = description;

      if (isForSale) {
        console.log('Setting type to Property For Sale');
        property.type = 'Property For Sale';
      } else if (isForRent) {
        console.log('Setting type to Property For Rent');
        property.type = 'Property For Rent';
      } else {
        console.log('Setting type to null');
        property.type = null;
      }

      if (property.rooms.length > 0) {
        const room = property.rooms[0];
        room.bedrooms = bedrooms || room.bedrooms;
        room.bathrooms = bathrooms || room.bathrooms;
        room.regularPrice = regularPrice || room.regularPrice;
        room.specialPrice = specialPrice || room.specialPrice;
        room.furnished = furnished || room.furnished;
        room.parking = parking || room.parking;
        room.available = available || room.available;
        room.type_room = type_room || room.type_room;
        room.room_information = room_information || room.room_information;

        await room.save();
      } else {
        const room = await Room.create({
          property_id: property.id,
          bedrooms,
          bathrooms,
          regularPrice,
          specialPrice,
          offer,
          furnished,
          parking,
          available,
          guests: 0,
          type_room: defaultType ? 'Regular room' : type_room,
          room_information,
        });

        property.addRoom(room);
      }

      await property.save();
      if (req.files) {
        const fileNames = req.files.map((file) => file.filename);
        const basePaths = fileNames.map(
          (fileName) =>
            `${req.protocol}://${req.get(
              'host',
            )}/src/public/property/${fileName}`,
        );

        const propertyPicturesString = basePaths.join(',');

        const newPropertyPicture = await property_picture.create({
          property_pictures: propertyPicturesString,
        });
        await property.addPropertyPictures(newPropertyPicture);
        await property.save();
      }
    } else {
      const files = req.files;
      if (!files) {
        res.status(400);
        throw new Error('property picture is required');
      }

      const fileNames = req.files.map((file) => file.filename);
      const basePaths = fileNames.map(
        (fileName) =>
          `${req.protocol}://${req.get(
            'host',
          )}/src/public/property/${fileName}`,
      );

      const propertyPicturesString = basePaths.join(',');

      property = await Properties.create({
        tenant_id,
        name,
        address,
        description,
        categories,
        sell: isForSale,
        rent: isForRent,
        type: isForSale
          ? 'Property For Sale'
          : isForRent
          ? 'Property For Rent'
          : null,
      });

      const room = await Room.create({
        property_id: property.id,
        bedrooms,
        bathrooms,
        regularPrice,
        specialPrice,
        offer,
        furnished,
        parking,
        available,
        guests: 0,
        type_room: type_room || 'Regular room',
        room_information,
      });
      property.addRoom(room);

      const newPropertyPicture = await property_picture.create({
        property_pictures: propertyPicturesString,
      });

      await property.addPropertyPictures(newPropertyPicture);
    }

    return res.status(200).json({
      status: 'success',
      data: {
        property: {
          id: property.id,
        },
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
    const properties = await Properties.findAll({
      include: [
        {
          model: Room,
          as: 'rooms',
        },
        {
          model: property_picture,
          as: 'propertyPictures',
        },
        {
          model: Tenants,
          attributes: ['name'],
        },
      ],
    });

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

exports.getPropertiesTenant = async (req, res, next) => {
  try {
    const tenant_id = req.user.id;

    const properties = await Properties.findAll({
      where: { tenant_id: tenant_id },
      include: [
        {
          model: Room,
          as: 'rooms',
        },
        {
          model: property_picture,
          as: 'propertyPictures',
        },
      ],
    });

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
    const tenant_id = req.user ? req.user.id : null;
    const property = await Properties.findByPk(req.params.id, {
      include: [
        {
          model: Room,
          as: 'rooms',
        },
        {
          model: property_picture,
          as: 'propertyPictures',
        },
        {
          model: Tenants,
          attributes: ['name'],
        },
      ],
    });
    if (!property || (tenant_id && property.tenant_id !== tenant_id)) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to view this property',
      });
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
    const property = await Properties.findByPk(req.params.id, {
      include: [
        {
          model: property_picture,
          as: 'propertyPictures',
        },
      ],
    });
    if (!property || property.tenant_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to delete this property',
      });
    }

    const propertyPictures = property.propertyPictures || [];

    await Promise.all(
      propertyPictures.map(async (picture) => {
        await picture.destroy();
      }),
    );

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
    const { location, date, guests, category, sort } = req.query;

    const where = {};
    const order = [];

    if (location) {
      where.address = { [Op.like]: `%${location}%` };
    }

    if (date) {
      const [startDate, endDate] = date.split(' to ');
      where['$rooms.startDate$'] = {
        [Op.gte]: new Date(startDate),
      };
      where['$rooms.endDate$'] = {
        [Op.lte]: new Date(endDate),
      };
    }

    if (guests) {
      where['$rooms.guests$'] = {
        [Op.gte]: guests,
      };
    }

    if (category) {
      where.categories = {
        [Op.like]: `%${category}%`,
      };
    }

    const sortOptions = {
      priceAsc: ['rooms', 'regularPrice', 'ASC'],
      priceDesc: ['rooms', 'regularPrice', 'DESC'],
      az: ['name', 'ASC'],
      za: ['name', 'DESC'],
    };

    if (sort) {
      order.push(sortOptions[sort]);
    }

    const searchResult = await Properties.findAll({
      where,
      include: [
        {
          model: Room,
          as: 'rooms',
          where: where['$rooms.startDate$'] ? where : null,
        },
        {
          model: property_picture,
          as: 'propertyPictures',
        },
        {
          model: Tenants,
          attributes: ['name'],
        },
      ],
      order,
    });

    res.json({ success: true, data: searchResult });
  } catch (error) {
    console.error('Error searching properties', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
