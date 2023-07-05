const express = require('express');

//controllers
const orderController = require('../controllers/order.controller');

//middlewares
const authMiddleware = require('./../middlewares/authMiddleware');
const orderMiddleware = require('./../middlewares/orderMiddleware');
const mealMiddleware = require('./../middlewares/mealMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/', mealMiddleware.validMealOrder, orderController.createOrder);

router.get('/me', orderController.findAllOrders);

router
  .route('/:id')
  .patch(
    orderMiddleware.validOrder,
    orderMiddleware.validOrderUser,
    orderController.updateOrder
  )
  .delete(
    orderMiddleware.validOrder,
    orderMiddleware.validOrderUser,
    orderController.deleteOrder
  );

module.exports = router;
