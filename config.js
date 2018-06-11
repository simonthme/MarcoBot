/**
 * Created by corentin on 27/04/2018.
 */
module.exports = {
  tokenAppFacebook : 'EAAe0IGvwaycBADdXYIK8gZAxXvEmkjOJtrxiXoO7KZCotmI4L6O6CKJgWMh5SuNqYoUVy8n1IgmPvVoMLzGor2cKNnfcGXZCNFhTqJ6gAOejkFENcnPgZBUQG3M2kV9fzY6DFup6Wwuq6LjAQNXXlAxrQXe3nj5jYBPZAmJPoPwZDZD',
  clientTokenDialogflow: "c8ad203d756f4c828380f8e61d261cde",
  projectIDDialogflow: "first-agent-af296",
  verificationMessenger: "xFdu09GhnS8f4n-ghEzsx",
  keyApiGoogle: "AIzaSyCeV-rbeGfSA913Pzk8lRjo5I7pZ6Gu39s",
  clientId: 'fdsf479dfsqgbnv34nv274vbjsjhs874',
  clientSecret: '9e9b442e502b4a37e3af88a542b2e4e09f41429a189a44f30cd19152ca1abdc3',
  // The variable to change: if you want development it's 0,
  // if you want production it's 1
  // if you localhost it's 2
  indexCategory: 2,
  category: [
    // ======= DEVELOPMENT =======
    {
      apiUrl: 'https://apidev.marco-app.com/api',
      authUrl: 'https://apidev.marco-app.com/auth',
      apiGraphQlUrl: 'https://apidev.marco-app.com/graphql',
      port: 4002
    },
    // ======= PRODUCTION =======
    {
      apiUrl: 'https://api.marco-app.com/api',
      authUrl: 'https://api.marco-app.com/auth',
      apiGraphQlUrl: 'https://api.marco-app.com/graphql',
      port: 4004
    },
    // ======= LOCALHOST =======
    {
      apiUrl: 'http://api:3003/api',
      apiGraphQlUrl: 'http://api:3003/graphql',
      authUrl: 'http://api:3003/auth',
      apiNgrok: 'http://api:3003/graphql',
      recommendationApilUrl: 'http://recommandation_api:3005/graphql',
      port: 4000
    }
  ]
};