const postbackDefault = require('../messenger/postbackBlocks/default');
const postbackGetStarted = require('../messenger/postbackBlocks/getStarted');

module.exports = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const payload = event.postback.payload;
  switch (payload) {
    case 'EVENT_GET_STARTED':
      postbackGetStarted(senderID);
      break;
    default :
     postbackDefault(senderID);
      break;
  }
};