const Restaurant = require('../models/restaurantsModel');
const Review = require('./../models/reviewsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRestaurant = catchAsync(async (req, res, next) => {
  const { restaurantId, id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId || id,
      status: true,
    },
    include: [
      {
        model: Review,
      },
    ],
  });

  if (!restaurant) {
    return next(new AppError(`Restaurant with id: ${id} not found`, 404));
  }

  req.restaurant = restaurant;
  next();
});
