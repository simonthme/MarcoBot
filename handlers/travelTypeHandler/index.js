const quickReplyTravelType = require('./travelType');

module.exports = (payload, senderID) => {
  switch (payload) {
    case 'ALONE':
      quickReplyTravelType(senderID, 1);
      break;
    case 'PARTNER':
      quickReplyTravelType(senderID, 2);
      break;
    case 'FRIENDS':
      quickReplyTravelType(senderID, 3);
      break;
    case 'FAMILY':
      quickReplyTravelType(senderID, 4);
      break;
  }
};