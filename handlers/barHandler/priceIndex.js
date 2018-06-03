const barHandler = require('./bar');

module.exports = (payload, type, senderID) => {
  switch (payload) {
    case 'ONE':
      barHandler(type, 1, senderID);
      break;
    case 'TWO':
      barHandler(type , 2, senderID);
      break;
    case 'THREE':
      barHandler(type , 3, senderID);
      break;
    case 'FOUR':
      barHandler(type , 4, senderID);
      break;
  }
};



