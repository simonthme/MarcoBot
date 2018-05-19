const product_data = require('../messenger/product_data');
const apiMessenger = require('./apiMessenger');
const apiGraphql = require('./apiGraphql');
const userMessenger = require('../graphql/accountMessenger/query');
const helper = require('../helpers/helper');
const postbackDefault = require('../messenger/postbackBlocks/default');
const postbackGetStarted = require('../messenger/postbackBlocks/getStarted');
const postbackInteractionWithCard = require('../messenger/blocks/interactionWithCard');
const postbackPrice = require('../messenger/postbackBlocks/price');
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
      case 'REST_GASTRONOMY':
          postbackPrice(senderID, 'REST', 'GASTRONOMY');
        break;
      case 'REST_VEGGIE':
        postbackPrice(senderID, 'REST', 'VEGGIE');
        break;
      case 'REST_BRUNCH':
        postbackPrice(senderID, 'REST', 'BRUNCH');
        break;
      case 'REST_STREET':
        postbackPrice(senderID, 'REST', 'STREET');
        break;
      case 'REST_TRADI':
        postbackPrice(senderID, 'REST', 'TRADI');
        break;
      case 'REST_REST':
        postbackPrice(senderID, 'REST', 'REST');
        break;
      case 'BAR_TRENDY':
          postbackPrice(senderID, 'BAR', 'TRENDY');
        break;
      case 'BAR_ATYPICAL':
        postbackPrice(senderID, 'BAR', 'ATYPICAL');
        break;
      case 'BAR_HIGHCLASS':
        postbackPrice(senderID, 'BAR', 'HIGHCLASS');
        break;
      case 'BAR_PUB':
        postbackPrice(senderID, 'BAR', 'PUB');
        break;
      case 'BAR_CAFE':
        postbackPrice(senderID, 'BAR', 'CAFE');
        break;
      case 'BAR_WINE':
        postbackPrice(senderID, 'BAR', 'WINE');
        break;
      default :
        postbackDefault(senderID);
        break;
    }
  }
};