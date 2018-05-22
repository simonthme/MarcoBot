const priceIndex = require('./priceIndex');

module.exports = (payload, price, senderID) => {
  switch (payload) {
    case 'TRENDY':
      priceIndex(price, 'TRENDY', senderID);
      break;
    case 'ATYPICAL':
      priceIndex(price, 'ATYPICAL', senderID);
      break;
    case 'HIGHCLASS':
      priceIndex(price, 'HIGHCLASS', senderID);
      break;
    case 'PUB':
      priceIndex(price, 'PUB', senderID);
      break;
    case 'CAFE':
      priceIndex(price, 'CAFE', senderID);
      break;
    case 'WINE':
      priceIndex(price, 'WINE', senderID);
      break;
  }
};