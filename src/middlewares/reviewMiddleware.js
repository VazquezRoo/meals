const Review = require('../models/restaurantsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validReview = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      status: true,
      restaurantId,
    },
  });

  if (!review) {
    return next(new AppError(`Review with id: ${id} not found`, 404));
  }

  req.review = review;
  next();
});
