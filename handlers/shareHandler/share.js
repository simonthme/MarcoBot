const product_data = require("../../messenger/product_data");
const apiMessenger = require("../../helpers/apiMessenger");

module.exports = (senderID) => {
  let messageData = {
    recipient: {
      id: senderID
    },
  };
  messageData.message = product_data.shareMessage;
  apiMessenger.sendToFacebook(messageData)
    .then(response => {
      messageData.message = product_data.question1MessageListView;
      return apiMessenger.sendToFacebook(messageData)
    })
    .then(res => {
      console.log('share end');
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};