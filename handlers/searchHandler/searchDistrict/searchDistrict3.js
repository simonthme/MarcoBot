/**
 * Created by corentin on 12/06/2018.
 */
const product_data = require("../../../messenger/product_data");
const apiMessenger = require("../../../helpers/apiMessenger");
const helper = require("../../../helpers/helper");
module.exports = (senderID) => {
  let messageData = {
    recipient: {
      id: senderID
    },
    message: ''
  };
  messageData.sender_action = 'typing_on';
  return apiMessenger.sendToFacebook(messageData)
    .then(helper.delayPromise(2000))
    .then(resp => {
      delete messageData.sender_action;
      messageData.message = product_data.selectionDistrictType3;
      if (resp.status === 200) {
        return apiMessenger.sendToFacebook(messageData)
      }
    })
    .catch(err => {
      console.log(err.response.data);
    });
};