const searchRestaurant = require('./searchRestaurant');
const searchDistrict = require('./searchDistrict/searchDistrict');
const searchDistrictAt = require('./searchDistrict/searchDistrictAt');
const searchBar = require('./searchBar');
const searchTalkingWithHuman = require('./talkWithHuman');
const searchVisit = require('./searchVisit');

module.exports = (payload, senderID) => {
  if(payload.includes('DISTRICTAT')){
    return searchDistrictAt(senderID, payload.slice(10))
  }
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
    case 'HUMAN':
      searchTalkingWithHuman(senderID);
      break;
    case 'DISTRICT':
      searchDistrict(senderID);
      break;
    case 'OTHERDISTRICT':
      searchDistrictAt(senderID, 1);
      break;
    default:
      break;
  }
};
