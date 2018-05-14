const product_data = require("../product_data");
const apiMessenger = require("../../helpers/apiMessenger");
const helper = require("../../helpers/helper");
module.exports = (senderID) => {
  let messageData = {
    recipient: {
      id: senderID
    },
    message: ''
  };
  messageData.message = product_data.letsGoMessage;
  apiMessenger.sendToFacebook(messageData)
    .then(response => {
      delete messageData.message;
      messageData.sender_action = 'typing_on';
      if (response.status === 200)
        return apiMessenger.sendToFacebook(messageData);
    })
    .then(helper.delayPromise(1000))
    .then(response => {
      delete messageData.sender_action;
      messageData.message = product_data.preQuestionMessage;
      if (response.status === 200)
        return apiMessenger.sendToFacebook(messageData);
    })
    .then(response => {
      delete messageData.message;
      messageData.sender_action = 'typing_on';
      if (response.status === 200)
        return apiMessenger.sendToFacebook(messageData);
    })
    .then(helper.delayPromise(3000))
    .then(response => {
      delete messageData.sender_action;
      messageData.message = product_data.question1Message;
      if (response.status === 200)
        return apiMessenger.sendToFacebook(messageData);
    })
    .then(response => {
      delete messageData.message;
      messageData.sender_action = 'typing_on';
      if (response.status === 200)
        return apiMessenger.sendToFacebook(messageData);
    })
    .then(helper.delayPromise(2000))
    .catch(err => {
      console.log(err);
    });
};