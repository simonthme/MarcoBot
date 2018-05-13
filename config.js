/**
 * Created by corentin on 27/04/2018.
 */
module.exports = {
  tokenAppFacebook : 'EAAe0IGvwaycBAGwpbpYy5UZAdHIzPbrrH8PZCDV5hKBZArc0HMZCqSUim04AHD3Ct81TA8lk5kEGsi4zQyG0OolQfLXMK771aoIcUZArLW8infIOZBVDTRYg9crVKk81LMWWVzdCSZCHJMy0sz2suLrHvcm5OCfnDR8pphpYjoLOAZDZD',
  clientTokenDialogflow: "c8ad203d756f4c828380f8e61d261cde",
  projectIDDialogflow: "first-agent-af296",
  verificationMessenger: "xFdu09GhnS8f4n-ghEzsx",
  // The variable to change: if you want development it's 0,
  // if you want production it's 1
  // if you localhost it's 2
  indexCategory: 2,
  category: [
    // ======= DEVELOPMENT =======
    {
      apiUrl: 'https://apidev.marco-app.com/api',
      apiGraphQlUrl: 'https://apidev.marco-app.com/graphql',
      port: 4002
    },
    // ======= PRODUCTION =======
    {
      apiUrl: 'https://api.marco-app.com/api',
      apiGraphQlUrl: 'https://api.marco-app.com/graphql',
      port: 4004
    },
    // ======= LOCALHOST =======
    {
      apiUrl: 'http://api:3003/api',
      apiGraphQlUrl: 'http://api:3003/graphql',
      port: 4000
    }
  ]
};