const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitizer = require('perfect-express-sanitizer');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// routes
const userRouter = require('./routes/user.routes');
const restaurantRouter = require('./routes/restaurant.routes');
const mealRouter = require('./routes/meal.routes');
const orderRouter = require('./routes/order.routes');

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in one hour!',
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: false,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', limiter);

//rutas
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
