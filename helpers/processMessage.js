/**
 * Created by corentin on 30/04/2018.
 */
const Config = require('../config');
const apiAiClient = require("apiai")(Config.clientTokenDialogflow);
const user = require("../graphql/user/query");
const ApiGraphql = require('../helpers/apiGraphql');
const apiMessenger = require('../helpers/apiMessenger');
const messengerMethods = require('../messenger/messengerMethods');
const clientControl = require('../controllers/clientControl');
const product_data = require('../messenger/product_data');
const config = require("../config")

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

module.exports = (event) => {
  const apiGraphql = new ApiGraphql(config.category[config.indexCategory].apiGraphQlUrl, config.accessTokenMarcoApi);
  const senderId = event.sender.id;
  const message = event.message.text;
  const query = user.queryUserByAccountMessenger(senderId);
  apiGraphql.sendQuery(query)
    .then(res => {
      if (res.userByAccountMessenger === null) {
        messengerMethods.createUser(senderId)
          .then((userSaved) => {

          })
          .catch(err => console.log("Error to create USER: ", err))
      }
      const apiaiSession = apiAiClient.textRequest(message,
        {sessionId: Config.projectIDDialogflow});
      apiaiSession.on("response", (response) => {
        //TODO: FAIRE FONCTION QUI CHECK LA REPONSE DU DIALOGFLOW ET DONC DE LA DEMANDE DE L'UTILISATEUR
        console.log("RESPONSE ===> ", response.result);
        return clientControl.checkDialogflow(senderId, response)
      });
      apiaiSession.on("error", error => {
        console.log("ERROR dialogflow ===>", error)
        return sendMessage(senderId, product_data.question1MessageListView, "RESPONSE")
      });
      apiaiSession.end();
    })
    .catch(err => console.log(err));
};