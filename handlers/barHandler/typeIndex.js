const barHandler = require('./bar');

module.exports = (payload, type, senderID) => {
  switch (payload) {
    case 'ONE':
      barHandler(type, senderID);
      break;
    case 'TWO':
      barHandler(type , senderID);
      break;
    case 'THREE':
      barHandler(type , senderID);
      break;
    case 'FOUR':
      barHandler(type , senderID);
      break;
  }
};