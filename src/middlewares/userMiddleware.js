const User = require('../models/usersModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!user) {
    return next(new AppError(`User with id: ${id} not found`, 404));
  }

  req.user = user;
  next();
});
