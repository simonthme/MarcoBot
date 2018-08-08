/**
 * Created by corentin on 27/04/2018.
 */
const processMessage = require('../helpers/processMessage');
const receivedPostback = require('../helpers/receivedPostback');
const receivedQuickReply = require('../helpers/receivedQuickReply');
const receiveLocation = require('../helpers/receiveLocation');
const receiveDateArrival = require('../helpers/receiveDateArrival');
const receiveDurationTravel = require('../helpers/receiveDurationTravel');

module.exports = (req, res) =>  {
  if (req.body.object === "page"){
    req.body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && event.message.text) {
          if(event.message.quick_reply) {
            receivedQuickReply(event);
          } else if (event.message.nlp.entities.datetime && event.message.nlp.entities.datetime[0].confidence > 0.8) {
            receiveDateArrival(event);
          } else if(event.message.nlp.entities.duration && event.message.nlp.entities.duration[0].normalized.value && event.message.nlp.entities.duration[0].confidence > 0.8){
            receiveDurationTravel(event);
          } else {
            processMessage(event);
          }
        } else {
          if (event.postback) {
            receivedPostback(event);
          } else if (event.message.attachments && event.message.attachments[0].type === 'location') {
            receiveLocation(event);
          }
        }
      });
    });
    res.status(200).end();
  }
};