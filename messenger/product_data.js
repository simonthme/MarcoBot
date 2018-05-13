/**
 * Created by corentin on 02/05/2018.
 */
module.exports = {
  getStartedData: {
    "get_started": {
      "payload": "Let's go!"
    }
  },
  menuData: {
    "persistent_menu": [
      {
        "locale": "default",
        "composer_input_disabled": true,
        "call_to_actions": [
          {
            "title": "Info",
            "type": "nested",
            "call_to_actions": [
              {
                "title": "Help",
                "type": "postback",
                "payload": "HELP_PAYLOAD"
              },
              {
                "title": "Contact Me",
                "type": "postback",
                "payload": "CONTACT_INFO_PAYLOAD"
              }
            ]
          },
          {
            "type": "web_url",
            "title": "Visit website ",
            "url": "https://www.marco-app.com",
            "webview_height_ratio": "full"
          }
        ]
      },
      {
        "locale": "zh_CN",
        "composer_input_disabled": false
      }
    ]
  },
  welcomeMessage: {
    "greeting": [
      {
        "locale": "default",
        "text": "Marco is your personal travel assistant available 24h/24h on Facebook Messenger ! "
      }, {
        "locale": "en_US",
        "text": "Greeting text for en_US local !"
      }
    ]
  },



};