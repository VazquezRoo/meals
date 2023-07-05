const express = require('express');

//controllers
const userController = require('../controllers/user.controller');
const orderController = require('./../controllers/order.controller');

//middlewares
const validationMiddleware = require('./../middlewares/validationMiddlewares');
const userMiddleware = require('./../middlewares/userMiddleware');
const authMiddleware = require('./../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/singup',
  validationMiddleware.createUserValidation,
  userController.singup
);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  userController.login
);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .patch(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

router.get('/orders', orderController.findAllOrders);

router.get('/orders/:id', orderController.findOrder);

module.exports = router;
