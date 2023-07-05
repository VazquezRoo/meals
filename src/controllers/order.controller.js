const Order = require('./../models/ordersModel');
const catchAsync = require('./../utils/catchAsync');
const Meal = require('./../models/mealsModel');
const Restaurant = require('../models/restaurantsModel');

exports.findAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      status: true,
      userId: sessionUser.id,
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

  res.status(200).json({
    status: 'success',
    orders: orders.length,
    orders,
  });
});

exports.findOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const order = await Order.findOne({
    where: {
      status: true,
      id,
      userId: sessionUser.id,
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

  res.status(200).json({
    status: 'success',
    order,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;

  const { meal, sessionUser } = req;

  const order = await Order.create({
    quantity,
    meadlId: meal.id,
    userId: sessionUser.id,
    totalPrice: quantity * meal.price,
  });

  res.status(200).json({
    status: 'success',
    message: 'The order has been created',
    order,
  });
});

exports.findAllMyOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      status: true,
      userId: sessionUser.id,
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

  if (orders.length === 0) {
    orders = 'no orders added';
  }

  res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'Order has been completed!',
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'Order has been deleted!',
  });
});