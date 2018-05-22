const {request} = require('graphql-request');
const Config = require('../config');

module.exports = {
  sendQuery: (query) => {
    return request(Config.category[Config.indexCategory].recommendationApiUrl, query)
  },
  sendMutation: (query, variables) => {
    return request(Config.category[Config.indexCategory].recommendationApilUrl, query,
      variables)
  }
};