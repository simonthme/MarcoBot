/**
 * Created by corentin on 13/06/2018.
 */
const async = require("async");
const product_data = require("../../messenger/product_data");
const apiMessenger = require("../../helpers/apiMessenger");
const helper = require("../../helpers/helper");
const config = require("../../config");
const queryBar = require("../../graphql/bar/query");
const queryActivity = require("../../graphql/activity/query");
const queryClub = require("../../graphql/club/query");
const queryEvent = require("../../graphql/event/query");
const queryExhibition = require("../../graphql/exhibition/query");
const queryMuseum = require("../../graphql/museum/query");
const queryParc = require("../../graphql/parc/query");
const queryRestaurant = require("../../graphql/restaurant/query");
const queryShop = require("../../graphql/shop/query");
const queryShow = require("../../graphql/show/query");
const querySite = require("../../graphql/site/query");
const ApiGraphql = require("../../helpers/apiGraphql");

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

const events = {
  "BAR": (page) => queryBar.queryBars(page),
  "ACTIVITY": (page) => queryActivity.queryActivities(page),
  "CLUB": (page) => queryClub.queryClubs(page),
  "EVENT": (page) => queryEvent.queryEvents(page),
  "EXHIBITION": (page) => queryExhibition.queryExhibitions(page),
  "MUSEUM": (page) => queryMuseum.queryMuseums(page),
  "PARC": (page) => queryParc.queryParcs(page),
  "RESTAURANT": (page) => queryRestaurant.queryRestaurants(page),
  "SHOP": (page) => queryShop.queryShops(page),
  "SHOW": (page) => queryShow.queryShows(page),
  "SITE": (page) => querySite.querySites(page)
};

module.exports = (payload, senderID) => {
  const newPayload = payload.split(':');
  let eventName = newPayload[0];
  const page = newPayload[1];
  const apiGraphql = new ApiGraphql(config.category[config.indexCategory].apiGraphQlUrl, config.accessTokenMarcoApi);
  let dataToSend = {};
  apiGraphql.sendQuery(events[eventName](page))
    .then((res) => {
      let eventsNames = eventName === "ACTIVITY" ?
        "activities" : eventName.toLocaleLowerCase() + 's';
      const resultat = res[eventsNames];
      if(resultat !== null || resultat.length > 0){
        return product_data.templateList(resultat, eventName, page, "mongo")
          .then(result => {
            dataToSend = Object.assign({}, result);
            return sendMessage(senderID, dataToSend, "RESPONSE")
          })
          .then((response) => {
            if (response.status === 200)
              return apiMessenger.sendToFacebook({
                recipient: {id: senderID},
                sender_action: 'typing_on',
                messaging_types: "RESPONSE",
                message: ""
              })
          })
          .then(helper.delayPromise(2000))
          .then((response) => {
            if (response.status === 200)
              return sendMessage(senderID, product_data.question1MessageAfterDistrict, "RESPONSE")
          })
      } else {
        return sendMessage(senderID, product_data.nothingInThisDistrict, "RESPONSE")
      }
    })
    .catch(err => {
      console.log(err);
    });
};