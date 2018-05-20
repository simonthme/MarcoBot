const price = require('./price');

module.exports = (payload, senderID) => {
  switch (payload) {
    case 'TRENDY':
      price(senderID, 'BAR', 'TRENDY');
      break;
    case 'ATYPICAL':
      price(senderID, 'BAR', 'ATYPICAL');
      break;
    case 'HIGHCLASS':
      price(senderID, 'BAR', 'HIGHCLASS');
      break;
    case 'PUB':
      price(senderID,  'BAR', 'PUB');
      break;
    case 'CAFE':
      price(senderID,  'BAR', 'CAFE');
      break;
    case 'WINE':
      price(senderID,  'BAR', 'WINE');
      break;
  }
};