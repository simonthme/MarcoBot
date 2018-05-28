const quickReplyTravelType = require('./travelType');

module.exports = (payload, senderID) => {
  switch (payload) {
    case 'ALONE':
      quickReplyTravelType(senderID, 'alone');
      break;
    case 'PARTNER':
      quickReplyTravelType(senderID, 'couple');
      break;
    case 'FRIENDS':
      quickReplyTravelType(senderID, 'friend');
      break;
    case 'FAMILY':
      quickReplyTravelType(senderID, 'family');
      break;
  }
};