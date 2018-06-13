const product_data = require("../../messenger/product_data");
const apiMessenger = require("../../helpers/apiMessenger");
const recommandationApi = require('../../helpers/recommendationApi');
const apiGraphql = require("../../helpers/apiGraphql");
const bar = require('../../graphql/bar/query');
const helper = require("../../helpers/helper");
const userMutation = require('../../graphql/user/mutation');

module.exports = (type, price, senderID) => {
  let messageData = {
    recipient: {
      id: senderID
    },
    message: ''
  };
  let dataToSend = {};
  messageData.message = product_data.fetchBarsMessage;
  apiMessenger.sendToFacebook(messageData)
    .then(response => {
      if (response.status === 200)
        return apiGraphql.sendMutation(userMutation.addCategoryByAccountMessenger(), {
          PSID: senderID.toString(),
          category: type
        });
    })
    .then(response => {
      delete messageData.message;
      messageData.sender_action = 'typing_on';
      return apiMessenger.sendToFacebook(messageData);
    })
    .then(helper.delayPromise(1000))
    .then(response => {
      if (response.status === 200)
        return recommandationApi.sendQuery(bar.queryBarsByPriceAndType(senderID, type, price, 0));
    })
    .then(res => {
      console.log(res);
      return product_data.templateList(res.barsByPriceAndType, "BAR", 0)
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