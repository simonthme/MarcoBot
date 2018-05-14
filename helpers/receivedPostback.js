const product_data = require('../messenger/product_data');
const apiMessenger = require('./apiMessenger');
const apiGraphql = require('./apiGraphql');
const userMessenger = require('../graphql/userMessenger/query');
const helper = require('../helpers/helper');
const postbackDefault = require('../messenger/blocks/default');
const postbackGetStarted = require('../messenger/blocks/getStarted');
const postbackInteractionWithCard = require('../messenger/blocks/interactionWithCard');

module.exports = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const payload = event.postback.payload;
  if(payload.includes("GOING") || payload.includes("LATER") || payload.includes("VIEWMORE")){
    return postbackInteractionWithCard(payload, senderID);
  } else {
    switch (payload) {
      case 'EVENT_GET_STARTED':
        postbackGetStarted(senderID);
        break;
      default :
        postbackDefault(senderID);
        break;
    }
  }
};