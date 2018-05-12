/**
 * Created by corentin on 02/05/2018.
 */
const Config = require('../config');
const request = require('request');

module.exports = {
  sendToFacebook: (data) => {
    return new Promise((resolve, reject) => {
      request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {access_token: Config.tokenAppFacebook},
        method: "POST",
        json: data
      }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res)
      });
    });
  },

  receiveProfileFacebook: (psid) => {
    return new Promise((resolve, reject) => {
      request({
        url: `https://graph.facebook.com/v2.6/${psid}?fields=first_name,name,last_name,profile_pic,locale,timezone,gender`,
        qs: {access_token: Config.tokenAppFacebook},
        method: "GET",
      }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res)
      });
    });
  }
};