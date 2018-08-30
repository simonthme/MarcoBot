/**
 * Created by corentin on 27/04/2018.
 */
const processMessage = require('../helpers/processMessage');
const receivedPostback = require('../helpers/receivedPostback');
const receivedQuickReply = require('../helpers/receivedQuickReply');
const receiveLocation = require('../helpers/receiveLocation');
const receiveDateArrival = require('../helpers/receiveDateArrival');
const receiveDurationTravel = require('../helpers/receiveDurationTravel');
const axios = require('axios');

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
        } else if (event.referral) {
          console.log(event.referral);
          axios.post('https://graph.facebook.com/224098718181615/activities', {
            event: 'CUSTOM_APP_EVENTS',
            custom_events: JSON.stringify([
              {
                _eventName: event.referral.ref,
              }
            ]),
            advertiser_tracking_enabled: 1,
            application_tracking_enabled: 1,
            extinfo: JSON.stringify(['mb1']),
            page_id: event.recipient.id,
            page_scoped_user_id: event.sender.id
          })
            .then(response => {
              console.log(response.data);
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          if (event.postback) {
            if (event.postback.referral) {
              axios.post('https://graph.facebook.com/224098718181615/activities', {
                event: 'CUSTOM_APP_EVENTS',
                custom_events: JSON.stringify([
                  {
                    _eventName: event.postback.referral.ref,
                  }
                ]),
                advertiser_tracking_enabled: 1,
                application_tracking_enabled: 1,
                extinfo: JSON.stringify(['mb1']),
                page_id: event.recipient.id,
                page_scoped_user_id: event.sender.id
              })
                .then(response => {
                  console.log(response.data);
                })
            }
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