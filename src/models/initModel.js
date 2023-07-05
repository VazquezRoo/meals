const Meal = require('./mealsModel');
const Order = require('./ordersModel');
const Restaurant = require('./restaurantsModel');
const Review = require('./reviewsModel');
const User = require('./usersModel');

const initModel = () => {
  User.hasMany(Order);
  Order.belongsTo(User, { foreignKey: 'userId' });

  User.hasMany(Review);
  Review.belongsTo(User, { foreignKey: 'userId' });

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

  Meal.hasOne(Order);
  Order.hasOne(Meal, { foreignKey: 'mealId' });
};

module.exports = initModel;
