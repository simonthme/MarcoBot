const quickReplyConfirm = require('../messenger/quickReplyBlocks/confirm');
const quickReplyCancel = require('../messenger/quickReplyBlocks/cancel');
const quickReplyTravelType = require(
  '../messenger/quickReplyBlocks/travelType');
const quickReplyLocation = require(
  '../messenger/quickReplyBlocks/quickReplyLocation');
const postbackDefault = require('../messenger/postbackBlocks/default');
const quickReplySite = require('../messenger/quickReplyBlocks/site/site');
const quickReplyBar = require('../messenger/quickReplyBlocks/bar/bar');
const quickReplyRest = require(
  '../messenger/quickReplyBlocks/restaurant/restaurant');
const quickReplyDistrict = require(
  '../messenger/quickReplyBlocks/district/district');
const noUpdateLocation = require(
  '../messenger/quickReplyBlocks/noUpdateLocation');

module.exports = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const payload = event.message.quick_reply.payload;
  if (payload.includes("NOLOCATIONEVENT")) {
    return quickReplyLocation(payload, senderID);
  } else {
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
      case 'EVENT_REST':
        quickReplyRest(senderID);
        break;
      case 'EVENT_BAR':
        quickReplyBar(senderID);
        break;
      case 'EVENT_DISTRICT':
        quickReplyDistrict(senderID);
        break;
      case 'NO_UPDATE_LOCATION':
        noUpdateLocation(senderID);
        break;
      default :
        postbackDefault(senderID);
        break;
    }
  }
};