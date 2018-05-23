/**
 * Created by corentin on 17/05/2018.
 */
const apiGraphql = require("../../helpers/apiGraphql");
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
const apiMessenger = require("../../helpers/apiMessenger");
const product_data = require("../product_data");
const helper = require("../../helpers/helper");
const queryUser = require("../../graphql/user/query");

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

const sendMessage = (senderID, data, typeMessage) => {
  return new Promise((resolve, reject) => {
    const objectToSend = {
      recipient: {id: senderID},
      messaging_types: typeMessage,
      message: data
    };
    apiMessenger.sendToFacebook(objectToSend)
      .then((res) => resolve(res))
      .catch(err => reject(err));
  });
};

const noLocation = (senderID, eventID, eventName) => {
  let event = {};
  return events[eventName](eventID)
    .then(res => {
      if (res[eventName.toLowerCase()]) {
        event = res[eventName.toLowerCase()];
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
      if (response.status === 200)
        return sendMessage(senderID, product_data.noLocationEvent(event.name), "RESPONSE");
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
      if (response.status === 200)
        return sendMessage(senderID, product_data.noLocationEvent2(event.location.name), "RESPONSE");
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
      if (response.status === 200)
        return sendMessage(senderID, product_data.sendLocation({lat: event.location.lat,
          lng: event.location.lng}, event.name), "RESPONSE");
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
      if (response.status === 200)
        return sendMessage(senderID, product_data.question1MessageAfterLocation, "RESPONSE");
    })
    .catch(err => console.log(err))
};

const oldLocation = (senderID, eventID, eventName) => {
  let event = {};
  let user = {};
  return apiGraphql.sendQuery(queryUser.queryUserByAccountMessenger(senderID))
    .then((response) => {
      if(response.userByAccountMessenger){
        user = response.userByAccountMessenger;
        return events[eventName](eventID)
      }
    })
    .then(res => {
      if (res[eventName.toLowerCase()]) {
        event = res[eventName.toLowerCase()];
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
      if (response.status === 200)
        return sendMessage(senderID, product_data.letsGoMessage2, "RESPONSE");
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
      if (response.status === 200)
        return sendMessage(senderID, product_data.sendItinerary(
          {lat: user.geoLocation.lat, lng: user.geoLocation.lng},
          {lat: event.location.lat, lng: event.location.lng},
        ), "RESPONSE");
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
      if (response.status === 200 && event.suggestion !== null) {
        return sendMessage(senderID, {text: event.suggestion}, "RESPONSE")
      } else {
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
      if(response.status === 200)
        return sendMessage(senderID, product_data.question1MessageAfterLocation, "RESPONSE")
    })
    .catch(err => console.log(err))
};
module.exports = (payload, senderID) => {
  const newPayload = payload.slice(0, payload.indexOf("_"));
  const eventName = payload.slice(payload.indexOf("_") + 1, payload.indexOf(":"));
  const eventID = payload.slice(payload.indexOf(":") + 1);
  let userId = "";
  switch (newPayload) {
    case "NOLOCATIONEVENT":
      return noLocation(senderID, eventID, eventName);
    case "USEOLDLOCATIONEVENT":
      return oldLocation(senderID, eventID, eventName);
    default:
      break;
  }
};