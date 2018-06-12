/**
 * Created by corentin on 11/06/2018.
 */
const async = require("async");
const product_data = require("../../messenger/product_data");
const apiMessenger = require("../../helpers/apiMessenger");
const helper = require("../../helpers/helper");
const config = require("../../config");
const ApiGraphql = require("../../helpers/apiGraphql");
const indexLocationQuery = require("../../graphql/indexLocation/query")

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

module.exports = (_district, senderID) => {
  let dataToSend = {};
  const apiGraphql = new ApiGraphql(config.category[config.indexCategory].apiGraphQlUrl, config.accessTokenMarcoApi);
  return apiGraphql.sendQuery(indexLocationQuery.findByDistrict(_district, 0))
    .then((response) => {
      if(response.findByDistrict !== null && response.findByDistrict.length > 0){
        let responses = [...response.findByDistrict];
        let newResponses = [];
        async.each(responses, (elem, callback) => {
          elem.kindElement = "";
          for (const propertyName in elem) {
            if (propertyName !== "id" && propertyName !== "users_id"
              && propertyName !== "lastClick" && propertyName !== "dateClick" && elem[propertyName] !== null) {
              elem[propertyName].kindElement = propertyName.slice(0, propertyName.indexOf("s_")).toUpperCase();
              if (elem[propertyName].kindElement === "ACTIVITIE") elem[propertyName].kindElement = "ACTIVITY";
              newResponses.push(elem[propertyName]);
              return callback();
            }
          }
        }, (err) => {
          if(err) return sendMessage(senderID,
            {text: "Ooops looks like something wrong, try again later"}, "RESPONSE");
          return product_data.templateListFromDifferentEvent(newResponses)
        })
      } else {
        return sendMessage(senderID, product_data.nothingInThisDistrict, "RESPONSE")
      }
    })
    .then(result => {
      if (result){
        dataToSend = Object.assign({}, result);
        
      }
    })
    .catch(err => console.log(err))
};