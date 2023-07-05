const Order = require('../models/usersModel');
const Meal = require('./../models/mealsModel');
const AppError = require('../utils/appError');
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

exports.validOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }

  req.order = order;
  next();
});

exports.validOrderUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }
  if (order.userId !== sessionUser.id) {
    return next(
      new AppError('You do not have permission to perform this action!', 403)
    );
  }

  req.order = order;
  next();
});
