/**
 * Created by corentin on 02/05/2018.
 */
const {request} = require('graphql-request');
const Config = require('../config');

module.exports = {
  sendQuery: (query) => {
    return request(Config.category[Config.indexCategory].apiGraphQlUrl, query)
  },
  sendMutation: (query, variables) => {
    console.log(query);
    return request(Config.category[Config.indexCategory].apiGraphQlUrl, query,
      variables)
  }
};