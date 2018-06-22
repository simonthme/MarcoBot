const excitementHandler = require('../handlers/excitementHandler/index');
const travelTypeHandler = require('../handlers/travelTypeHandler/index');
const restaurantHandler = require('../handlers/restaurantHandler/typeIndex');
const barHandler = require('../handlers/barHandler/typeIndex');
const searchHandler = require('../handlers/searchHandler/index');
const quickReplyLocation = require('../messenger/quickReplyBlocks/quickReplyLocation');
const postbackDefault = require('../messenger/postbackBlocks/default');
const noUpdateLocation = require('../messenger/quickReplyBlocks/noUpdateLocation');
const postbackInteractionWithCard = require('../messenger/postbackBlocks/interactionWithCard');
const backQuestionHandler = require('../handlers/backQuestionHandler/backQuestion');
module.exports = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const payload = event.message.quick_reply.payload;
  const payloadType = payload.split("_");
  if (payload.includes("NOLOCATIONEVENT") || payload.includes("USEOLDLOCATIONEVENT")) {
    return quickReplyLocation(payload, senderID);
  } else if (payload.includes("GOING") || payload.includes("LATER") ) {
      return postbackInteractionWithCard(payload, senderID)
  } else {
    switch (payloadType[0]) {
      case 'EXCITEMENT':
        excitementHandler(payloadType[1], senderID);
        break;
      case 'TRAVELTYPE':
        travelTypeHandler(payloadType[1], senderID);
        break;
      case 'SEARCH':
        searchHandler(payloadType[1], senderID);
        break;
      case 'NOUPDATELOCATION':
        noUpdateLocation(senderID);
        break;
      case 'PRICERESTAURANT':
        restaurantHandler(payloadType[1], payloadType[2], senderID);
        break;
      case 'PRICEBAR':
        barHandler(payloadType[1], payloadType[2], senderID);
        break;
      case 'CATEGORY':
        backQuestionHandler(payloadType[1], senderID);
        break;
      default :
        postbackDefault(senderID);
        break;
    }
  }
};