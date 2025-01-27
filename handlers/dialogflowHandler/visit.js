/**
 * Created by corentin on 14/06/2018.
 */
const queryVisit = require('../../graphql/bar/query');
const product_data = require("../../messenger/product_data");
const config = require("../../config");
const ApiGraphql = require('../../helpers/apiGraphql');
const helper = require("../../helpers/helper");
const apiMessenger = require('../../helpers/apiMessenger');
const typeIndexVisit = require('../visitHandler/typeIndex');
const searchDistrict = require('../searchHandler/searchDistrict/searchDistrict');

const sendMessage = (senderId, data, typeMessage) => {
  return new Promise((resolve, reject) => {
    const objectToSend = {
      recipient: {id: senderId},
      messaging_types: typeMessage,
      message: data
    };
    apiMessenger.sendToFacebook(objectToSend)
      .then((res) => resolve(res))
      .catch(err => reject(err));
  });
};

module.exports = (parameters, senderId) => {
  if (typeof parameters.visiting !== "undefined" && parameters.visiting !== null
    && parameters.visiting.length > 0 && parameters.visiting[0] !== 'visiting') {
    return typeIndexVisit(parameters.visiting, senderId);
  } else {
    return searchDistrict(senderId);
  }
};
