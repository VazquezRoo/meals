const Review = require('./../models/reviewsModel');
const catchAsync = require('./../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant } = req;
  const { sessionUser } = req;

  const review = await Review.create({
    comment: comment.toLowerCase(),
    rating,
    userId: sessionUser.id,
    restaurantId: restaurant.id,
  });

  res.status(200).json({
    status: 'success',
    message: 'The review has been created',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { sessionUser, review } = req;

  if (sessionUser.id !== review.userId) {
    return next(new AppError('You can only modify your comments', 401));
  }

  await review.update({ comment, rating });

  res.status(200).json({
    status: 'success',
    message: 'Review has been updated!',
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review, sessionUser } = req;

  if (sessionUser.id !== review.userId) {
    return next(new AppError('You can only delete your comments', 401));
  }

  await review.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Review has been deleted!',
  });
});
