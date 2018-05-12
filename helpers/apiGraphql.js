/**
 * Created by corentin on 02/05/2018.
 */
const {request} = require('graphql-request');
const Config = require('../config');

module.exports = {
  sendQuery: (query) => {
    return new Promise((resolve, reject) => {
      request(Config.category[Config.indexCategory].apiGraphQlUrl, query)
        .then(res => resolve(res))
        .catch(err => reject(err))
    });
  },
  sendMutation: (query, variables) => {
    return new Promise((resolve, reject) => {
      request(Config.category[Config.indexCategory].apiGraphQlUrl, query, variables)
        .then(res => resolve(res))
        .catch(err => reject(err))
    });
  }
};