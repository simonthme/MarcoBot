/**
 * Created by corentin on 14/05/2018.
 */
const apiGraphql = require("../../helpers/apiGraphql");
const queryUser = require("../../graphql/user/query");
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
const mutationGoing = require("../../graphql/going/mutation");
const mutationLater = require("../../graphql/later/mutation");
const apiMessenger = require("../../helpers/apiMessenger");
const product_data = require("../product_data");
const helper = require("../../helpers/helper");

const LIMIT_HOUR_ASK_LOCATION = 2;

const events = {
  "BAR": (id) => apiGraphql.sendQuery(queryBar.queryBar(id)),
  "ACTIVITY": (id) => apiGraphql.sendQuery(queryActivity.queryActivity(id)),
  "CLUB": (id) => apiGraphql.sendQuery(queryClub.queryClub(id)),
  "EVENT": (id) => apiGraphql.sendQuery(queryEvent.queryEvent(id)),
  "EXHIBITION": (id) => apiGraphql.sendQuery(queryExhibition.queryExhibition(id)),
  "MUSEUM": (id) => apiGraphql.sendQuery(queryMuseum.queryMuseum(id)),
  "PARC": (id) => apiGraphql.sendQuery(queryParc.queryParc(id)),
  "RESTAURANT": (id) => apiGraphql.sendQuery(queryRestaurant.queryRestaurant(id)),
  "SHOP": (id) => apiGraphql.sendQuery(queryShop.queryShop(id)),
  "SHOW": (id) => apiGraphql.sendQuery(queryShow.queryShow(id)),
  "SITE": (id) => apiGraphql.sendQuery(querySite.querySite(id))
};

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

const _createGoing = (senderID, userID, eventID, eventName, resultat) => {
  const key = `${eventName}s_id`;
  const dataToSend = {
    "users_id": userID
  };
  let user = {};
  dataToSend[key] = eventID;
  return apiGraphql.sendMutation(mutationGoing.createGoing(), dataToSend)
    .then(res => {
      if(res.createGoing){
        return apiGraphql.sendQuery(queryUser.queryUser(userID))
      }
    })
    .then(res => {
      if (res.user) {
        user = res.user;
        if (res.user.geoLocation.lat !== null) {
          const diffHour = Math.abs(new Date() - new Date(res.user.geoLocation.lastUpdated)) / 36e5;
          if (diffHour >= LIMIT_HOUR_ASK_LOCATION) {
            return sendMessage(senderID, product_data.rememberLocation(eventID), "RESPONSE")
          } else {
            return sendMessage(senderID, product_data.letsGoMessage, "RESPONSE")
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
              .then(response => {
                if (response.status === 200)
                  return sendMessage(senderID, product_data.sendItinerary(user.geoLocation, resultat.location), "RESPONSE")
              })
              .then(response => {
                if (response.status === 200) {
                  return apiMessenger.sendToFacebook({
                    recipient: {id: senderID},
                    sender_action: 'typing_on',
                    messaging_types: "RESPONSE",
                    message: ""
                  })
                }
              })
              .then(helper.delayPromise(2000))
              .then(response => {
                if (response.status === 200 && resultat.suggestion !== null){
                  return sendMessage(senderID, {text: resultat.suggestion}, "RESPONSE")
                } else {
                  return apiMessenger.sendToFacebook({
                    recipient: {id: senderID},
                    sender_action: 'typing_on',
                    messaging_types: "RESPONSE",
                    message: ""
                  })
                }
              })
              .then(response => {
                if(response.status === 200)
                  return sendMessage(senderID, product_data.updateLocation(), "RESPONSE")
              })
              .catch(err => console.log(err))
          }
        } else {
          return sendMessage(senderID, product_data.askLocation(eventID), "RESPONSE")
        }
      }
    })
};

const _createLater = (senderID, userID, eventID, eventName, event) => {
  const dataToSend = {
    "users_id": userID
  };
  dataToSend[`${eventName}s_id`] = eventID;
  return apiGraphql.sendMutation(mutationLater.createLater(), dataToSend)
    .then(res => {
      if(res){
        return apiMessenger.sendToFacebook({
          recipient: {id: senderID},
          sender_action: 'typing_on',
          messaging_types: "RESPONSE",
          message: ""
        })
      }
    })
    .then(helper.delayPromise(2000))
    .then(res => {
      if(res.status === 200)
      return sendMessage(senderID, product_data.saveLater, "RESPONSE")
    })
    .then(res => {
      if(res.status === 200){
        return apiMessenger.sendToFacebook({
          recipient: {id: senderID},
          sender_action: 'typing_on',
          messaging_types: "RESPONSE",
          message: ""
        })
      }
    })
    .then(helper.delayPromise(2000))
    .then(res => {
      if(res.status === 200)
      return sendMessage(senderID, product_data.question1MessageAfterLater, "RESPONSE")
    })


};

const _seeMore = (senderID, event) => {

};

module.exports = (payload, senderID) => {
  const newPayload = payload.slice(0, payload.indexOf("_"));
  const event = payload.slice(payload.indexOf("_") + 1, payload.indexOf(":"));
  const eventID = payload.slice(payload.indexOf(":") + 1);
  let userId = "";
  return apiGraphql.sendQuery(queryUser.queryUserByAccountMessenger(senderID))
    .then(res => {
      if (res.userByAccountMessenger) {
        userId = res.userByAccountMessenger.id;
        return events[event](eventID)
      }
    })
    .then(res => {
      const eventName = event.toLocaleLowerCase();
      const resultat = res[eventName];
      switch (newPayload) {
        case "GOING":
          return _createGoing(senderID, userId, eventID, eventName, resultat);
        case "LATER":
          return _createLater(senderID, userId, eventID, eventName);
        case "VIEWMORE":
          return _seeMore(senderID, resultat);
        default:
          break;
      }
    })
    .catch(err => console.log(err));
};