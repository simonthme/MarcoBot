const product_data = require('../messenger/product_data');
const apiMessenger = require('./apiMessenger');
const apiGraphql = require('./apiGraphql');
const userMessenger = require('../graphql/userMessenger/query');
const helper = require('../helpers/helper');

module.exports = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const payload = event.postback.payload;
  let messageData = {
    recipient: {
      id: senderID
    },
    message: ''
  };
  switch (payload) {
    case 'EVENT_GET_STARTED':
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
      break;
    default :
      messageData = {
        recipient: {
          id: senderID
        },
        message: product_data.defaultPostback
      };
      apiMessenger.sendToFacebook(messageData)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
      break;
  }
};