/**
 * Created by corentin on 27/04/2018.
 */
const Config = require("../config");

module.exports = (req, res) => {
  const hubChallenge = req.query['hub.challenge'];
  const hubMode = req.query['hub.mode'];
  const verifyTokenMatches = (req.query['hub.verify_token'] === Config.verificationMessenger);
  if(hubMode && verifyTokenMatches) {
    return res.status(200).send(hubChallenge);
  }
  return res.status(403).end();
};