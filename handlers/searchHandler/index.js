const searchRestaurant = require('./searchRestaurant');
const searchDistrict = require('./searchDistrict/searchDistrict');
const searchDistrict1 = require('./searchDistrict/searchDistrict1');
const searchDistrict2 = require('./searchDistrict/searchDistrict2');
const searchDistrict3 = require('./searchDistrict/searchDistrict3');
const searchDistrict4 = require('./searchDistrict/searchDistrict4');
const searchDistrict5 = require('./searchDistrict/searchDistrict5');
const searchOtherDistrict = require('./searchDistrict/searchOtherDistrict');
const searchBar = require('./searchBar');
const searchTalkingWithHuman = require('./talkWithHuman');
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
    case 'HUMAN':
      searchTalkingWithHuman(senderID);
      break;
    case 'DISTRICT':
      searchDistrict(senderID);
      break;
    case 'OTHERDISTRICT':
      searchDistrict1(senderID);
      break;
    case 'DISTRICT1':
      searchDistrict1(senderID);
      break;
    case 'DISTRICT2':
      searchDistrict2(senderID);
      break;
    case 'DISTRICT3':
      searchDistrict3(senderID);
      break;
    case 'DISTRICT4':
      searchDistrict4(senderID);
      break;
    default:
      break;
  }
};
