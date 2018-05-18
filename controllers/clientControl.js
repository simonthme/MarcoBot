/**
 * Created by corentin on 13/05/2018.
 */
const apiMessenger = require('../helpers/apiMessenger');
const apiGraphql = require('../helpers/apiGraphql');
const queryBar = require('../graphql/bar/query')
const productData = require("../messenger/product_data");


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
    return new Promise((resolve, reject) => {
      if (response.result.parameters && response.result.parameters.eatdrink === ('bar' || 'drink')) {
        let dataToSend = {};
        apiGraphql.sendQuery(queryBar.queryBars(0))
          .then((res) => {
            return productData.templateList(res.bars, "BAR")
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