const Meal = require('./mealsModel');
const Order = require('./ordersModel');
const Restaurant = require('./restaurantsModel');
const Review = require('./reviewsModel');
const User = require('./usersModel');

const initModel = () => {
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User, { foreignKey: 'userId' });

  Restaurant.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(Restaurant, { foreignKey: 'userId' });

  Restaurant.hasMany(Meal, { foreignKey: 'userId' });
  Meal.belongsTo(Restaurant, { foreignKey: 'userId' });

  Meal.hasOne(Order, { foreignKey: 'userId' });
  Order.hasOne(Meal, { foreignKey: 'userId' });
};

module.exports = initModel;
