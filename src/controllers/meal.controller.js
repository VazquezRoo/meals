const Meal = require('./../models/mealsModel');
const Restaurant = require('./../models/restaurantsModel');
const catchAsync = require('./../utils/catchAsync');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { restaurant } = req;

  const meal = await Meal.create({
    name: name.toLowerCase(),
    price,
    restaurantId: restaurant.id,
  });

  res.status(200).json({
    status: 'success',
    message: 'The meal has been created',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;

  await meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'Meal has been updated!',
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Meal has been deleted!',
  });
});

exports.findAllMeal = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: true,
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  if (meals.length === 0) {
    meals = 'no meals added';
  }

  res.status(200).json({
    status: 'success',
    results: meals.length,
    meals,
  });
});

exports.findMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: 'success',
    meal,
  });
});
