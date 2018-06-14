const product_data = require('../messenger/product_data');
const apiMessenger = require('./apiMessenger');
const apiGraphql = require('./apiGraphql');
const userMessenger = require('../graphql/accountMessenger/query');
const helper = require('../helpers/helper');
const postbackDefault = require('../messenger/postbackBlocks/default');
const initHandler = require('../handlers/initHandler/init');
const priceHandlerRestaurant = require('../handlers/priceHandler/restaurantIndex');
const priceHandlerBar = require('../handlers/priceHandler/barIndex');
const aroundDistrictHandler = require('../handlers/searchHandler/aroundByDistrict');
const searchHandler = require('../handlers/searchHandler/index');
const nextPageEventHandler = require('../handlers/nextPageHandler/nextPageEvent');
const visitHandler = require('../handlers/visitHandler/typeIndex');
const nextPageDiffEventHandler = require('../handlers/nextPageHandler/nextPageDiffEvent');
const nextPageRecommendationHandler = require('../handlers/nextPageHandler/nextPageRecommendation');
const nextPageDiffEventRecommendationHandler = require('../handlers/nextPageHandler/nextPageDiffEventRecommendation');

const postbackInteractionWithCard = require('../messenger/postbackBlocks/interactionWithCard');
const postbackLocation = require('../messenger/quickReplyBlocks/quickReplyLocation');
module.exports = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const payload = event.postback.payload;
  const payloadType = payload.split("_");
  const message = event.message ? event.message : null;
  if(payload.includes("GOING") || payload.includes("LATER") || payload.includes("VIEWMORE")){
    return postbackInteractionWithCard(payload, senderID);
  } else {
    switch (payloadType[0]) {
      case 'INIT':
        initHandler(senderID);
        break;
      case 'RESTAURANT':
        priceHandlerRestaurant(payloadType[1], senderID);
        break;
      case 'BAR':
        priceHandlerBar(payloadType[1], senderID);
        break;
      case 'AROUND':
        aroundDistrictHandler(payload.slice(7), senderID);
        break;
      case 'SEARCH':
        searchHandler(payloadType[1], senderID);
        break;
      case 'SITE':
        visitHandler(payloadType[1], senderID);
        break;
      case 'NEXTPAGEEVENT':
        nextPageEventHandler(payloadType[1], senderID);
        break;
      case 'NEXTPAGENEO4J':
        nextPageRecommendationHandler(payloadType[1], senderID);
        break;
      case 'NEXTPAGEDIFFEVENT':
        nextPageDiffEventHandler(payload.slice(18), senderID);
        break;
      case 'NEXTPAGEDIFFEVENTNEO4J':
        nextPageDiffEventRecommendationHandler(payload.slice(24), senderID);
        break;
      default :
        postbackDefault(senderID);
        break;
    }
  }
};