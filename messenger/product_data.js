/**
 * Created by corentin on 02/05/2018.
 */
const Config = require("../config");
const async = require("async");
module.exports = {
  getStartedData: {
    "get_started": {
      "payload": "EVENT_GET_STARTED"
    }
  },
  menuData: {
    "persistent_menu": [
      {
        "locale": "default",
        "composer_input_disabled": false,
        "call_to_actions": [
          {
            "title": "My Account",
            "type": "nested",
            "call_to_actions": [
              {
                "title": "Info",
                "type": "postback",
                "payload": "EVENT_INFO"
              },
              {
                "type": "web_url",
                "title": "More about Marco",
                "url": "https://www.marco-app.com/",
                "webview_height_ratio": "full"
              }
            ]
          }
        ]
      }
    ]
  },
  welcomeMessage: {
    "greeting": [
      {
        "locale": "default",
        "text": "Marco is your personal travel assistant available 24h/24h on Facebook Messenger! ✈️ "
      }, {
        "locale": "en_US",
        "text": "Greeting text for en_US local !"
      }
    ]
  },
  templateList: (list, kindElement) => {
    return new Promise((resolve, reject) => {
      const arrayOfElement = [];
      async.each(list, (elem, callback) => {
        const element = {
          "title": `${elem.name}`,
          //"image_url": `${Config.category[Config.indexCategory].apiUrl}/image/${elem.photos[0]}`,
          "subtitle": "We have the right hat for everyone.",
          "buttons": [
            {
              "type": "postback",
              "title": "I want to go",
              "payload": `GOING_${kindElement}:${elem.id}`
            },
            {
              "type": "postback",
              "title": "Later",
              "payload": `LATER_${kindElement}:${elem.id}`
            },
            {
              "type": "postback",
              "title": "View more",
              "payload": `VIEWMORE_${kindElement}:${elem.id}`
            },
            // {
            //   "type": "postback",
            //   "title": "Back",
            //   "payload": `BACK`
            // },
          ]
        };
        arrayOfElement.push(element);
        callback()
      }, (err) => {
        if (err) return reject(err);
        return resolve({
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": arrayOfElement
            }
          }
        });
      })
    })
  },
  initialMessage(user) {
    return {
      "text": `Hi ${user.firstName} ! 👋 \nI'm Marco your parisian travel assistant. 🙂`
    }
  },
  missionMessage: {
    "text": `My mission is to make feel like a local in this amazing city. 🇫🇷 `
  },
  experienceMessage: {
    "text": `With me, your trip becomes a unique experience! ❤️`
  },
  myWorkMessage: {
    "text": 'Even before you think about it, I’ll instantly show you the best of Paris. You’ll be sure not to miss out on anything and stay away from tourist traps.'
  },
  excitementMessage: {
    "text": "Isn't it exciting? 🤩",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Yes let's go!",
        "payload": "EVENT_CONFIRM_EXCITEMENT",
      },
      {
        "content_type": "text",
        "title": "No I don't need you",
        "payload": "EVENT_CANCEL_EXCITEMENT",
      }
    ]
  },
  defaultPostback: {
    "text": "Mmmh, there seems to be a problem..."
  }
};