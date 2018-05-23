const product_data = require("../../messenger/product_data");
const apiMessenger = require("../../helpers/apiMessenger");
const recommandationApi = require('../../helpers/recommendationApi');
const restaurant = require('../../graphql/restaurant/query');
const helper = require("../../helpers/helper");

module.exports = (type, price, senderID) => {
  let messageData = {
    recipient: {
      id: senderID
    },
    message: ''
  };
  console.log('type : ' + typeof type);
  console.log('price :' + price);
  console.log('id : ' + senderID);
  messageData.message = product_data.fetchRestaurantsMessage;
  apiMessenger.sendToFacebook(messageData)
    .then(response => {
      delete messageData.message;
      messageData.sender_action = 'typing_on';
      if (response.status === 200)
        return apiMessenger.sendToFacebook(messageData);

    })
    .then(helper.delayPromise(1000))
    .then(response => {
      if (response.status === 200)
        return recommandationApi.sendQuery(restaurant.queryRestaurantsByPriceAndType(senderID, type, price, 0));
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};