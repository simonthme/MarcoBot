const product_data = require("../../messenger/product_data");
const apiMessenger = require("../../helpers/apiMessenger");
const ApiGraphql = require("../../helpers/apiGraphql");
const restaurant = require('../../graphql/restaurant/query');
const helper = require("../../helpers/helper");
const userMutation = require('../../graphql/user/mutation');
const config = require('../../config');

module.exports = (type, price, senderID) => {
  let messageData = {
    recipient: {
      id: senderID
    },
    message: ''
  };
  let dataToSend = {};
  messageData.message = product_data.fetchRestaurantsMessage;
  const apiGraphql = new ApiGraphql(config.category[config.indexCategory].apiGraphQlUrl, config.accessTokenMarcoApi);
  const recommandationApi = new ApiGraphql(config.category[config.indexCategory].recommendationApilUrl, config.accessTokenRecommendationApi);
  apiMessenger.sendToFacebook(messageData)
    .then(response => {
      if (response.status === 200)
        return apiGraphql.sendMutation(userMutation.addCategoryByAccountMessenger(), {
          PSID: senderID.toString(),
          category: type
        });
    })
    .then(response => {
      console.log(response);
      delete messageData.message;
      messageData.sender_action = 'typing_on';
      return apiMessenger.sendToFacebook(messageData);
    })
    .then(helper.delayPromise(1000))
    .then(response => {
      if (response.status === 200)
        return recommandationApi.sendQuery(restaurant.queryRestaurantsByPriceAndType(senderID, type, price, 0));
    })
    .then(res => {
      console.log(res);
      return product_data.templateList(res.restaurantsByPriceAndType, "RESTAURANT", 0, "neo4j")
    })
    .then(result => {
      dataToSend = Object.assign({}, result);
      delete messageData.sender_action;
      messageData.message = dataToSend;
      return apiMessenger.sendToFacebook(messageData);
    })
    .then((response) => {
      if (response.status === 200)
        return apiMessenger.sendToFacebook({
          recipient: {id: senderID},
          sender_action: 'typing_on',
          messaging_types: "RESPONSE",
          message: ""
        })
    })
    .then((response) => {
      if (response.status === 200)
        return apiMessenger.sendToFacebook(senderID, dataToSend, "RESPONSE")
    })
    .then(() => resolve())
    .catch(err => {
      console.log(err.response.data.error);
    });
};