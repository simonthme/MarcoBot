const searchRestaurant = require('./searchRestaurant');
const searchDistrict = require('./searchDistrict');
const searchBar = require('./searchBar');
const searchVisit = require('./searchVisit');

module.exports = (payload, senderID) => {
  switch (payload) {
    case 'VISIT':
      searchVisit(senderID);
      break;
    case 'RESTAURANT':
      searchRestaurant(senderID);
      break;
    case 'BAR':
      searchBar(senderID);
      break;
    case 'DISTRICT':
      searchDistrict(senderID);
      break;
  }
};