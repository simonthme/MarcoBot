/**
 * Created by corentin on 13/05/2018.
 */
const apiMessenger = require('../helpers/apiMessenger');
const ApiGraphql = require('../helpers/apiGraphql');
const queryBar = require('../graphql/bar/query');
const productData = require("../messenger/product_data");
const config = require("../config");
const helper = require("../helpers/helper");

const sendMessage = (senderId, data, typeMessage) => {
  return new Promise((resolve, reject) => {
    const objectToSend = {
      recipient: {id: senderId},
      messaging_types: typeMessage,
      message: data
    };
    apiMessenger.sendToFacebook(objectToSend)
      .then((res) => resolve(res))
      .catch(err => reject(err));
  });
};

module.exports = {
  checkDialogflow: (senderId, response) => {
    const apiGraphql = new ApiGraphql(config.category[config.indexCategory].apiGraphQlUrl, config.accessTokenMarcoApi);
    return new Promise((resolve, reject) => {
      if (response.result.parameters && response.result.parameters.eatdrink === ('bar' || 'drink')) {
        let dataToSend = {};
        apiGraphql.sendQuery(queryBar.queryBars(0))
          .then((res) => {
            return productData.templateList(res.bars, "BAR", 0, "mongo")
          })
          .then(result => {
            dataToSend = Object.assign({}, result);
            return sendMessage(senderId, {text: response.result.fulfillment.speech}, "RESPONSE")
          })
          .then((response) => {
            if (response.status === 200)
              return apiMessenger.sendToFacebook({
                recipient: {id: senderId},
                sender_action: 'typing_on',
                messaging_types: "RESPONSE",
                message: ""
              })
          })
          .then((response) => {
            if (response.status === 200)
              return sendMessage(senderId, dataToSend, "RESPONSE")
          })
          .then(() => {
            if (response.status === 200)
              return apiMessenger.sendToFacebook({
                recipient: {id: senderId},
                sender_action: 'typing_on',
                messaging_types: "RESPONSE",
                message: ""
              })
          })
          .then(helper.delayPromise(2000))
          .then(() => {
            return sendMessage(senderId, productData.question1MessageListView, "RESPONSE")
          })
          .then(() => resolve())
          .catch(err => {
            console.log(err);
          });
      } else {
        const result = {text: response.result.fulfillment.speech};
        sendMessage(senderId, result, "RESPONSE")
          .then(() => resolve())
          .catch((err) => reject(err))
      }
    })
  }
};