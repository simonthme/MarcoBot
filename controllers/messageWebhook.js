/**
 * Created by corentin on 27/04/2018.
 */
const processMessage = require('../helpers/processMessage');

module.exports = (req, res) =>  {
  if (req.body.object === "page"){
    req.body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && event.message.text) {
          processMessage(event);
        }
      });
    });
    res.status(200).end();
  }
};