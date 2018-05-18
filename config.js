/**
 * Created by corentin on 27/04/2018.
 */
module.exports = {
  tokenAppFacebook : 'EAAe0IGvwaycBAAYGE3M02HWyp7UGZCahOxstJC45WPgqRCP01TN4y3mqbbyvAQG8pbOW6wchbNlnWZA3eJ49INZBDOMwSyZCqwsHZAd7c9fciQqJrKjseZCZBu4bkD8TfvuMfSGZCIu6OR3PWBdub2taJ6k8g8Fd5hIYzAGw1qWymAZDZD',
  clientTokenDialogflow: "c8ad203d756f4c828380f8e61d261cde",
  projectIDDialogflow: "first-agent-af296",
  verificationMessenger: "xFdu09GhnS8f4n-ghEzsx",
  keyApiGoogle: "AIzaSyCeV-rbeGfSA913Pzk8lRjo5I7pZ6Gu39s",
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
      apiNgrok: 'http://api:3003/graphql',
      port: 4000
    }
  ]
};