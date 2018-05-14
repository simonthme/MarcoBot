const quickReplyConfirm = require('../messenger/quickReplyBlocks/confirm');
const quickReplyCancel = require('../messenger/quickReplyBlocks/cancel');
const postbackDefault = require('../messenger/postbackBlocks/default');

module.exports = (event) => {
  console.log(event);
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const payload = event.message.quick_reply.payload;
  switch (payload) {
    case 'EVENT_CONFIRM_EXCITEMENT':
      quickReplyConfirm(senderID);
      break;
    case 'EVENT_CANCEL_EXCITEMENT':
      quickReplyCancel(senderID);
      break;
    case 'EVENT_ALONE':
      break;
    case 'EVENT_PARTNER':
      break;
    case 'EVENT_FRIENDS':
      break;
    case 'EVENT_FAMILY':
      break;
    default :
      postbackDefault(senderID);
      break;
  }
};