const price = require('./price');

module.exports = (payload, senderID) => {
  switch (payload) {
    case 'GASTRONOMY':
      price(senderID, 'RESTAURANT', 'GASTRONOMY');
      break;
    case 'VEGGIE':
      price(senderID, 'RESTAURANT', 'VEGGIE');
      break;
    case 'BRUNCH':
      price(senderID, 'RESTAURANT', 'BRUNCH');
      break;
    case 'STREET':
      price(senderID,  'RESTAURANT', 'STREET');
      break;
    case 'TRADITIONAL':
      price(senderID,  'RESTAURANT', 'TRADITIONAL');
      break;
    case 'OTHER':
      price(senderID,  'RESTAURANT', 'OTHER');
      break;
  }
};