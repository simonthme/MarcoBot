const quickReplyConfirm = require('../messenger/quickReplyBlocks/confirm');
const quickReplyCancel = require('../messenger/quickReplyBlocks/cancel');
const quickReplyTravelType = require('../messenger/quickReplyBlocks/travelType');
const postbackDefault = require('../messenger/postbackBlocks/default');
const  quickReplySite = require('../messenger/quickReplyBlocks/site/site');
const  quickReplyBar = require('../messenger/quickReplyBlocks/bar/bar');
const  quickReplyRest = require('../messenger/quickReplyBlocks/restaurant/restaurant');
const  quickReplyExhib = require('../messenger/quickReplyBlocks/exhibition/exhibition');
const  quickReplyEvent = require('../messenger/quickReplyBlocks/event/event');
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
      quickReplyTravelType(senderID, 1);
      break;
    case 'EVENT_PARTNER':
      quickReplyTravelType(senderID, 2);
      break;
    case 'EVENT_FRIENDS':
      quickReplyTravelType(senderID, 3);
      break;
    case 'EVENT_FAMILY':
      quickReplyTravelType(senderID, 4);
      break;
    case 'EVENT_SITE':
      quickReplySite(senderID);
      break;
    case 'EVENT_EXHIB':
      quickReplyExhib(senderID);
      break;
    case 'EVENT_REST':
      quickReplyRest(senderID);
      break;
    case 'EVENT_BAR':
      quickReplyBar(senderID);
      break;
    case 'EVENT_EVENT':
      quickReplyEvent(senderID);
      break;
    default :
      postbackDefault(senderID);
      break;
  }
};