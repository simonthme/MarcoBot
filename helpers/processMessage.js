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
        clientControl.checkDialogflow(senderId, response)
          .then(() => console.log("CHECKING DONE !"))
          .catch(err => console.log(err));
      });
      apiaiSession.on("error", error => console.log("ERROR dialogflow ===>", error));
      apiaiSession.end();

    })
    .catch(err => console.log(err));
};