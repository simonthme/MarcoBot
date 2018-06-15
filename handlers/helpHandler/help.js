const product_data = require("../../messenger/product_data");
const apiMessenger = require("../../helpers/apiMessenger");

module.exports = (senderID) => {
  let messageData = {
    recipient: {
      id: senderID
    },
    message: ''
  };
  messageData.message = product_data.helpMessage;
  apiMessenger.sendToFacebook(messageData)
    .then(response => {
      console.log('help');
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};