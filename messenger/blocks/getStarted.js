const apiGraphql = require("../../helpers/apiGraphql");
const userMessenger = require("../../graphql/userMessenger/query");
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
  apiGraphql.sendQuery(userMessenger.queryPSID(senderID))
    .then(response => {
      messageData.message =
        product_data.initialMessage(response.userMessenger);
      apiMessenger.sendToFacebook(messageData)
        .then(response => {
          delete messageData.message;
          messageData.sender_action = 'typing_on';
          if (response.status === 200)
            return apiMessenger.sendToFacebook(messageData);
        })
        .then(response => {
          delete messageData.sender_action;
          messageData.message = product_data.missionMessage;
          if (response.status === 200)
            return  apiMessenger.sendToFacebook(messageData);
        })
        .then(response => {
          delete messageData.message;
          messageData.sender_action = 'typing_on';
          if (response.status === 200)
            return apiMessenger.sendToFacebook(messageData);
        })
        .then(helper.delayPromise(2000))
        .then(response => {
          delete messageData.sender_action;
          messageData.message = product_data.experienceMessage;
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
        .then(response => {
          delete messageData.sender_action;
          messageData.message = product_data.myWorkMessage;
          if (response.status === 200)
            return apiMessenger.sendToFacebook(messageData);
        })
        .then(response => {
          delete messageData.message;
          messageData.sender_action = 'typing_on';
          if (response.status === 200)
            return apiMessenger.sendToFacebook(messageData);
        })
        .then(helper.delayPromise(4000))
        .then(response => {
          delete messageData.sender_action;
          messageData.message = product_data.excitementMessage;
          if (response.status === 200)
            return apiMessenger.sendToFacebook(messageData);
        })
        .then(response => {
          console.log(response.data);
          console.log("end of first batch");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};