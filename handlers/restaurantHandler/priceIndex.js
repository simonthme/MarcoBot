const restaurantHandler = require('./restaurant');

module.exports = (payload, type, senderID) => {
  switch (payload) {
    case 'ONE':
      restaurantHandler(type, 1, senderID);
      break;
    case 'TWO':
      restaurantHandler(type, 2, senderID);
      break;
    case 'THREE':
      restaurantHandler(type, 3, senderID);
      break;
    case 'FOUR':
      restaurantHandler(type, 4, senderID);
      break;
  }
};