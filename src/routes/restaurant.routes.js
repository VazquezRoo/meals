const express = require('express');

//controllers
const restaurantController = require('../controllers/restaurant.controller');
const reviewController = require('./../controllers/reviews.controller');

//middlewares
const userMiddleware = require('./../middlewares/userMiddleware');
const authMiddleware = require('./../middlewares/authMiddleware');
const restaurantMiddleware = require('./../middlewares/restaurantMiddleware');
const reviewMiddleware = require('./../middlewares/reviewMiddleware');
const validationMiddleware = require('./../middlewares/validationMiddlewares');

const router = express.Router();

router
  .route('/')
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo,
    validationMiddleware.createRestaurantValidation,
    restaurantController.createRestaurant
  )
  .get(restaurantController.findAllRestaurants);

router
  .route('/:id')
  .get(
    restaurantMiddleware.validRestaurant,
    restaurantController.findRestaurant
  )
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo,
    restaurantMiddleware.validRestaurant,
    restaurantController.updateRestaurant
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo,
    restaurantMiddleware.validRestaurant,
    restaurantController.deleteRestaurant
  );

router.use(authMiddleware.protect);

router.post(
  '/reviews/:id',
  restaurantMiddleware.validRestaurant,
  reviewController.createReview
);

router
  .route('/reviews/:restaurant/:id')
  .patch(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    reviewMiddleware.validReview,
    reviewController.updateReview
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    reviewMiddleware.validReview,
    reviewController.deleteReview
  );

module.exports = router;
