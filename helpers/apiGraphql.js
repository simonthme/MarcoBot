/**
 * Created by corentin on 02/05/2018.
 */
const { GraphQLClient } = require('graphql-request');

class GraphQlClient {
  constructor(url, token) {
    console.log(url);
    console.log(token);
    this.client = new GraphQLClient(url, {
      headers: {
        Authorization: 'Bearer ' + token,
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
<<<<<<< HEAD
}
=======


};
>>>>>>> 6211e0d032da1af454ac7e5b79065d5f7e59dabc

module.exports = GraphQlClient;