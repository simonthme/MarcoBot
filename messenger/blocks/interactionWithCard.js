/**
 * Created by corentin on 14/05/2018.
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

module.exports = (payload, senderID) => {
  const newPayload = payload.slice(0, payload.indexOf("_"));
  const event = payload.slice(payload.indexOf("_") + 1, payload.indexOf(":"));
  const id = payload.slice(payload.indexOf(":") + 1);
  return events[event](id)
    .then(res => {

      console.log(res[event.toLocaleLowerCase()])
    })
    .catch(err => console.log(err));

};