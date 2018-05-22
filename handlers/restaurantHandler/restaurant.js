const product_data = require("../../messenger/product_data");
const apiMessenger = require("../../helpers/apiMessenger");
const recommandationApi = require('../../helpers/recommendationApi');
const helper = require("../../helpers/helper");

module.exports = (type, price, senderID) => {
  let messageData = {
    recipient: {
      id: senderID
    },
    message: ''
  };
  messageData.message = product_data.fetchRestaurantsMessage;
  apiMessenger.sendToFacebook(messageData)
    .then(response => {
      delete messageData.message;
      messageData.sender_action = 'typing_on';
      // if (response.status === 200)
      //   return recommandationApi.sendQuery(q);
    })
    // .then(helper.delayPromise(1000))
    .then(response => {
      console.log('DO REQUEST');
    })
    .catch(err => {
      console.log(err);
    });
};