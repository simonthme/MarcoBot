/**
 * Created by corentin on 17/05/2018.
 */
const apiGraphql = require("../../helpers/apiGraphql");
const queryGoing = require("../../graphql/going/query");

const saveLocation = () => {

};

module.exports = (payload, senderID) => {
  const newPayload = payload.slice(0, payload.indexOf(":"));
  const eventID = payload.slice(payload.indexOf(":") + 1);
  let userId = "";
  switch(newPayload){
    case "YESLOCATIONEVENT":
      return;
    default:
      break;
  }
};