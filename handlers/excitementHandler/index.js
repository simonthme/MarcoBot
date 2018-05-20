const confirm = require('./confirm');
const cancel = require('./cancel');

module.exports = (payload, senderID) => {
  switch (payload) {
    case 'CONFIRM':
      confirm(senderID);
      break;
    case 'CANCEL':
      cancel(senderID);
  }
};