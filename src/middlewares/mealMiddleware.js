const Meal = require('../models/mealsModel');
const Restaurant = require('./../models/restaurantsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`, 404));
  }

  req.meal = meal;
  next();
});

exports.validMealOrder = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: true,
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  if (!meal) {
    return next(new AppError(`Meal with id: ${mealId} not found`, 404));
  }

  req.meal = meal;
  next();
});
