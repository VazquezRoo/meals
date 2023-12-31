const Order = require('../models/ordersModel');
const Meal = require('./../models/mealsModel');
const AppError = require('../utils/appError');
const Restaurant = require('./../models/restaurantsModel');
const catchAsync = require('../utils/catchAsync');

exports.validMeal = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`, 404));
  }

  req.meal = meal;
  next();
});

exports.validOrderUser = catchAsync(async (req, res, next) => {
  const { sessionUser, order } = req;

  if (order.dataValues.userId !== sessionUser.dataValues.id) {
    return next(
      new AppError('You do not have permission to perform this action!', 403)
    );
  }

  req.order = order;
  next();
});

exports.validOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
      },
    ],
  });

  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }

  req.order = order;
  next();
});
