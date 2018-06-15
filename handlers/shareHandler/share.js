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
      console.log('share');
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};