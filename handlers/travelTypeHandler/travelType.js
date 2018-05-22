
const product_data = require("../../messenger/product_data");
const apiMessenger = require("../../helpers/apiMessenger");
const helper = require("../../helpers/helper");
const apiGraphql = require("../../helpers/apiGraphql");
const userMutation = require("../../graphql/user/mutation");
module.exports = (senderID, travelType) => {
  let messageData = {
    recipient: {
      id: senderID
    },
    message: ''
  };
  const user = {
  accountmessengers_id: senderID,
    travelType: travelType
  };
  console.log(user);
  apiGraphql.sendMutation(userMutation.updateUserByAccountMessenger(), user)
    .then(response => {
      if(response.updateUserByAccountMessenger !== null) {
        messageData.message = product_data.question1Message;
        return apiMessenger.sendToFacebook(messageData)
      }
    })
    .then(resp => {
      console.log('end of traveltype');
    })
    .catch(err => {
      console.log(err);
    });
};