const product_data = require("../product_data");
const apiMessenger = require("../../helpers/apiMessenger");
module.exports = (senderID) => {
  let messageData = {
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
};