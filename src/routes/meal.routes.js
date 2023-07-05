const express = require('express');

//controllers
const mealController = require('../controllers/meal.controller');

//middlewares
// const userMiddleware = require('./../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/authMiddleware');
const vaidationMiddleware = require('./../middlewares/validationMiddlewares');
const restaurantMiddleware = require('./../middlewares/restaurantMiddleware');
const mealMiddleware = require('./../middlewares/mealMiddleware');

const router = express.Router();

router.get('/', mealController.findAllMeal);

router.post(
  '/:id',
  vaidationMiddleware.createMealValidation,
  restaurantMiddleware.validRestaurant,
  authMiddleware.protect,
  authMiddleware.restrictTo,
  mealController.createMeal
);

router
  .route('/:id')
  .get(mealMiddleware.validMeal, mealController.findMeal)
  .patch(
    mealMiddleware.validMeal,
    authMiddleware.protect,
    authMiddleware.restrictTo,
    mealController.updateMeal
  )
  .delete(
    mealMiddleware.validMeal,
    authMiddleware.protect,
    authMiddleware.restrictTo,
    mealController.deleteMeal
  );

module.exports = router;
