/**
 * Created by corentin on 02/05/2018.
 */
const { GraphQLClient } = require('graphql-request');
const Config = require('../config');

class GraphQlClient {
  constructor() {
    console.log(Config.accessToken);
    this.client = new GraphQLClient(Config.category[Config.indexCategory].apiGraphQlUrl, {
      headers: {
        Authorization: 'Bearer ' + Config.accessToken,
      },
    });
  }

  sendQuery(query) {
    return this.client.request(query)
  }

  sendMutation(query, variables) {
    return this.client.request(query,
      variables)
  }


};

module.exports = GraphQlClient;