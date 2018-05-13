/**
 * Created by corentin on 13/05/2018.
 */
const apiMessenger = require('../helpers/apiMessenger');
const apiGraphql = require('../helpers/apiGraphql');
const queryBar = require('../graphql/bar/query')

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
      if(response.result.parameters.eatdrink === ('bar' || 'drink')){
        apiGraphql.sendQuery(queryBar.queryBars(0))
          .then((res) =>{
            console.log('RESULTAT API', res);
            const result = {text: `${response.result.fulfillment.speech}`};
            sendMessage(senderId, result, "RESPONSE")
              .then(() => resolve())
              .catch((err) => reject(err))
          })
          .catch(err => console.log(err));
      } else {
        const result = {text: response.result.fulfillment.speech};
        sendMessage(senderId, result, "RESPONSE")
          .then(() => resolve())
          .catch((err) => reject(err))
      }
    })
  }
};