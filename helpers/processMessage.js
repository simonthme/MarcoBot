/**
 * Created by corentin on 30/04/2018.
 */
const Config = require('../config');
const apiAiClient = require("apiai")(Config.clientTokenDialogflow);
const queryUserMessenger = require('../graphql/userMessenger/query');
const graphqlRequest = require('../helpers/apiGraphql');
const apiMessenger = require('../helpers/apiMessenger');
const messengerMethods = require('../messenger/messengerMethods');
const product_data = require('../messenger/product_data');

const sendMessage = (senderId, data, typeMessage) => {
  return new Promise((resolve, reject) => {
    const objectToSend = {
      recipient: {id: senderId},
      messaging_types: typeMessage,
      message: data
    };
    apiMessenger.sendToFacebook(objectToSend)
      .then((res) =>  resolve(res))
      .catch(err =>  reject(err));
  });
};

module.exports = (event) => {
  const senderId = event.sender.id;
  const message = event.message.text;
  const query = queryUserMessenger.queryPSID(senderId);
  graphqlRequest.sendQuery(query)
    .then(res => {
      if (res.userMessenger === null) {
        messengerMethods.createUser(senderId)
          .then((userSaved) => {

            //DO SOME SHIT
          })
          .catch(err => console.log("Error to create USER: ", err))
      } else {
        apiMessenger.callbackStartButton(product_data.getStartedData)
          .then(res => {
            console.log('response get started');
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        const apiaiSession = apiAiClient.textRequest(message,
          {sessionId: Config.projectIDDialogflow});
        apiaiSession.on("response", (response) => {
          //TODO: FAIRE FONCTION QUI CHECK LA REPONSE DU DIALOGFLOW ET DONC DE LA DEMANDE DE L'UTILISATEUR
          console.log("RESPONSE ===> ", response.result);
          const result = {text: response.result.fulfillment.speech};
          sendMessage(senderId, result, "RESPONSE")
            .then(() => console.log("Send to Messenger"))
            .catch((err) => console.log("Impossible to Send to Messenger: ", err))
        });
        apiaiSession.on("error", error => console.log("ERROR dialogflow ===>", error));
        apiaiSession.end();
      }

    })
    .catch(err => console.log(err));
};