const Review = require('../models/reviewsModel');
const Restaurant = require('./../models/restaurantsModel');
const catchAsync = require('./../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been created',
    restaurant,
  });
});

exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: true,
    },
    include: [
      {
        model: Review,
      },
    ],
  });

  if (restaurants.length === 0) {
    restaurants = 'no restaurants added';
  }

  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    restaurants,
  });
});

exports.findRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant has been updated!',
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant has been deleted!',
  });
});
