/**
 * Created by corentin on 02/05/2018.
 */
const Config = require("../config");
const async = require("async");
const anecdotes = require('../variableApp/anecdote');
const ARRAYDAY = ["sunday", "monday", "tuesday", "wednesday", "thursday",
  "friday", "saturday"];
const numberDayString = ['', 'first', 'second', 'third', 'fourth', 'fifth'];
const indexElementDistrict = require('../variableApp/district/index');
const limitPageDistrict = require('../variableApp/district/limit');

const generateSubtitle = (elem, TODAY) => {
  return new Promise((resolve, reject) => {
    let money = "";
    switch (elem.priceRange) {
      case 0:
        money = "FREE";
        break;
      case 1:
        money = "💰";
        break;
      case 2:
        money = "💰💰- 💰💰💰";
        break;
      case 3:
        money = "💰💰 - 💰💰💰";
        break;
      case 4:
        money = "💰💰💰💰";
        break;
      default:
        money = "FREE";
        break;
    }
    let schedule = "🕐 ";
    const daySchedule = (elem.schedule && elem.schedule[ARRAYDAY[TODAY.getDay()]] !== null) ?
      elem.schedule[ARRAYDAY[TODAY.getDay()]] : [];
    if (daySchedule.length > 0) {
      daySchedule.map((day, i) => {
        schedule = (day.start === "12:00 am" && day.end === "12:00 pm") ? schedule.concat("Always open")
          : schedule.concat(day.start, ' - ', day.end, ' ');
        if (i === daySchedule.length - 1) {
          resolve({schedule: schedule, money: money});
        }
      })
    } else {
      schedule = "❌ CLOSED";
      resolve({schedule: schedule, money: money});
    }
  });
};

module.exports = {
  getStartedData: {
    "get_started": {
      "payload": "INIT"
    }
  },
  menuData: {
    "persistent_menu": [
      {
        "locale": "default",
        "composer_input_disabled": false,
        "call_to_actions": [
          {
            "title": "👤 My account",
            "type": "nested",
            "call_to_actions": [
              {
                "title": "🔄 Switch city",
                "type": "postback",
                "payload": "CHANGEMYCITY"
              },
              {
                "title": "🗺 New trip",
                "type": "postback",
                "payload": "NEWTRIP"
              },
              {
                "title": "🧡 My favorites",
                "type": "postback",
                "payload": "MYFAVORITE_0"
              },
            ]
          },
          {
            "title": "🛎 Service",
            "type": "nested",
            "call_to_actions": [
              {
                "title": "Help",
                "type": "postback",
                "payload": "HELP"
              },
              {
                "title": "Subscription",
                "type": "postback",
                "payload": "SUBSCRIPTION"
              },
              {
                "title": "Restart",
                "type": "postback",
                "payload": "INIT"
              }
            ]
          },
          {
            "title": "💌 Invite a friend",
            "type": "postback",
            "payload": "INVITE"
          },

        ]
      }
    ]
  },
  wouldYouSubOrUnsub: {
    "text": "You can choose if you want to be susbcribe or unsubscribe to my notifications ",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Susbcribe 👍",
        "payload": "SUBSCRIBE_",
      },
      {
        "content_type": "text",
        "title": "Unsubscribe 👎",
        "payload": "UNSUBSCRIBE_",
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
        "text": "Marco is your personal travel assistant available 24h/24h on Facebook Messenger! ✈️"
      }
    ]
  },
  templateList: (list, kindElement, page, whichApi, category = '',
                 price = 0) => {
    console.log(list, kindElement, page, whichApi, category, price);
    return new Promise((resolve, reject) => {
      const TODAY = new Date();
      const arrayOfElement = [];
      async.each(list, (elem, callback) => {
        generateSubtitle(elem, TODAY)
          .then(res => {
            const elemLocationGoogleMap = elem.location.name.replace(" ", "+");
            const element = {
              "title": `${elem.name}`,
              "image_url": `https://api.marco-app.com/api/image/${elem.photos[0]}`,
              "subtitle": `📍 ${elem.location.name} \n${res.money}\n ${res.schedule}`,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Let's go!",
                  "payload": `GOING_${kindElement}:${elem.id || elem._id}`
                },
                {
                  "type": "element_share",
                  "share_contents": {
                    "attachment": {
                      "type": "template",
                      "payload": {
                        "template_type": "generic",
                        "elements": [
                          {
                            "title": `${elem.name}`,
                            "subtitle": `📍 ${elem.location.name} \n${res.money}\n ${res.schedule}`,
                            "image_url": `https://api.marco-app.com/api/image/${elem.photos[0]}`,
                            "default_action": {
                              "type": "web_url",
                              "url": "https://www.messenger.com/t/marco.bot.paris",

                            },
                            "buttons": [
                              {
                                "type": "web_url",
                                "url": `https://www.google.fr/maps/place/${elemLocationGoogleMap}`,
                                "title": "Where is it? 📍"
                              },
                            ]
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  "type": "postback",
                  "title": "Tell me more",
                  "payload": `VIEWMORE_${kindElement}:${elem.id || elem._id}`
                },
              ]
            };
            arrayOfElement.push(element);
            callback()
          })
          .catch(() => callback("AILLE"))
      }, (err) => {
        if (err) return reject(err);
        if (arrayOfElement.length === 5) {
          const NEXT_PAGE = whichApi === "neo4j" ?
            `NEXTPAGENEO4J_${category}_${price}` : "NEXTPAGEEVENT";
          const morePage = {
            "title": `See more`,
            "subtitle": `Let me show you more results.`,
            "image_url": `https://api.marco-app.com/api/image/FBProfileRe.png`,
            "buttons": [
              {
                "type": "postback",
                "title": "Show more results",
                "payload": `${NEXT_PAGE}_${kindElement}:${parseInt(page) + 1}`
              },
            ]
          };
          arrayOfElement.push(morePage)
        } else {
          const talkWithHuman = {
            "title": `I have nothing left in stock, but ask for a Parisian. 😉`,
            "subtitle": `If you want more information on Paris, request a local by clicking the button below.`,
            "image_url": `https://api.marco-app.com/api/image/askInformation.jpg`,
            "buttons": [
              {
                "type": "postback",
                "title": "Chat with a human",
                "payload": `SEARCH_HUMAN`
              },
            ]
          };
          arrayOfElement.push(talkWithHuman)
        }
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
  templateListFromDifferentEvent: (list, page, district, whichApi,
                                   category = '') => {
    return new Promise((resolve, reject) => {
      const TODAY = new Date();
      const arrayOfElement = [];
      async.each(list, (elem, callback) => {
        generateSubtitle(elem, TODAY)
          .then(res => {
            const elemLocationGoogleMap = elem.location.name.replace(" ", "+")
            const element = {
              "title": `${elem.name}`,
              "image_url": `https://api.marco-app.com/api/image/${elem.photos[0]}`,
              "subtitle": `📍 ${elem.location.name} \n${res.money}\n ${res.schedule}`,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Let's go!",
                  "payload": `GOING_${elem.kindElement}:${elem.id || elem._id}`
                },
                {
                  "type": "element_share",
                  "share_contents": {
                    "attachment": {
                      "type": "template",
                      "payload": {
                        "template_type": "generic",
                        "elements": [
                          {
                            "title": `${elem.name}`,
                            "subtitle": `📍 ${elem.location.name} \n${res.money}\n ${res.schedule}`,
                            "image_url": `https://api.marco-app.com/api/image/${elem.photos[0]}`,
                            "default_action": {
                              "type": "web_url",
                              "url": "https://www.messenger.com/t/marco.bot.paris",

                            },
                            "buttons": [
                              {
                                "type": "web_url",
                                "url": `https://www.google.fr/maps/place/${elemLocationGoogleMap}`,
                                "title": "Where is it? 📍"
                              },
                            ]
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  "type": "postback",
                  "title": "Tell me more",
                  "payload": `VIEWMORE_${elem.kindElement}:${elem.id ||
                  elem._id}`
                },
              ]
            };
            arrayOfElement.push(element);
            callback()
          })
          .catch(() => callback("AILLE"))
      }, (err) => {
        if (err) return reject(err);
        if (arrayOfElement.length === 5) {
          const NEXT_PAGE = whichApi === "neo4j" ?
            `NEXTPAGEDIFFEVENTNEO4J_${category}` :
            `NEXTPAGEDIFFEVENT_${district}`;
          const morePage = {
            "title": `See more`,
            "subtitle": `Let me show you more results.`,
            "image_url": `https://api.marco-app.com/api/image/FBProfileRe.png`,
            "buttons": [
              {
                "type": "postback",
                "title": "Show more results",
                "payload": `${NEXT_PAGE}:${parseInt(page) + 1}`
              },
            ]
          };
          arrayOfElement.push(morePage)
        } else {
          const talkWithHuman = {
            "title": `I have nothing left in stock, but ask for a Parisian. 😉`,
            "subtitle": `If you want more information on Paris, request a local by clicking the button below.`,
            "image_url": `https://api.marco-app.com/api/image/askInformation.jpg`,
            "buttons": [
              {
                "type": "postback",
                "title": "Chat with human",
                "payload": `SEARCH_HUMAN`
              },
            ]
          };
          arrayOfElement.push(talkWithHuman)
        }
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
  templateLaterView: (list, page) => {
    return new Promise((resolve, reject) => {
      const TODAY = new Date();
      const arrayOfElement = [];
      async.each(list, (elem, callback) => {
        generateSubtitle(elem, TODAY)
          .then(res => {
            const elemLocationGoogleMap = elem.location.name.replace(" ", "+");
            const element = {
              "title": `${elem.name}`,
              "image_url": `https://api.marco-app.com/api/image/${elem.photos[0]}`,
              "subtitle": `📍 ${elem.location.name} \n${res.money}\n ${res.schedule}`,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Let's go!",
                  "payload": `GOING_${elem.kindElement}:${elem.id || elem._id}`
                },
                {
                  "type": "element_share",
                  "share_contents": {
                    "attachment": {
                      "type": "template",
                      "payload": {
                        "template_type": "generic",
                        "elements": [
                          {
                            "title": `${elem.name}`,
                            "subtitle": `📍 ${elem.location.name} \n${res.money}\n ${res.schedule}`,
                            "image_url": `https://api.marco-app.com/api/image/${elem.photos[0]}`,
                            "default_action": {
                              "type": "web_url",
                              "url": "https://www.messenger.com/t/marco.bot.paris",

                            },
                            "buttons": [
                              {
                                "type": "web_url",
                                "url": `https://www.google.fr/maps/place/${elemLocationGoogleMap}`,
                                "title": "Where is it? 📍"
                              },
                            ]
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  "type": "postback",
                  "title": "Tell me more",
                  "payload": `VIEWMORE_${elem.kindElement}:${elem.id ||
                  elem._id}`
                },
              ]
            };
            arrayOfElement.push(element);
            callback()
          })
          .catch(() => callback("AILLE"))
      }, (err) => {
        if (err) return reject(err);
        if (arrayOfElement.length === 5) {
          const morePage = {
            "title": `See more`,
            "subtitle": `Let me show you more results.`,
            "image_url": `https://api.marco-app.com/api/image/FBProfileRe.png`,
            "buttons": [
              {
                "type": "postback",
                "title": "Show more results",
                "payload": `MYFAVORITE_${parseInt(page) + 1}`
              },
            ]
          };
          arrayOfElement.push(morePage)
        }
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
      "text": `Hi ${user.firstName} ! 👋 \nI’m Marco your own personal travel assistant. My goal is to make your trip an authentic experience by giving you the best insider tips, making sure you don’t miss out on anything and stay away from tourist traps. 🙂`
    }
  },
  initialMessage2: {
    "text": `I got tired of spending hours planning my visits, finding an authentic restaurant and looking for the trendiest bar of the city …`
  },
  initialMessage3: {
    "text": `So, every day I’ll send you a message with all the sightseeing you need to do for the day, what to eat on the go for lunch, and suggestions of amazing nights in the city your traveling.`
  },
  missionMessage: {
    "text": `Before we go any further, I’d like to optimize your experience by getting to know you a little bit better. `
  },
  missionMessage2: {
    "text": `For that I just need to know a little more about the details of your trip to be able to offer you relevant things to do.`
  },
  whichCity: {
    "text": `So which city did you choose for your unforgettable vacation?`,
  },
  whichCity2: {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "🇫🇷🇫🇷 Paris 🇫🇷🇫🇷",
            "image_url": `https://api.marco-app.com/api/image/paris.jpg`,
            "buttons": [
              {
                "type": "postback",
                "title": "Validate ✔️",
                "payload": `TRAVELINGTO_PARIS`
              },
            ]
          },
          {
            "title": "🇬🇧🇬🇧 London 🇬🇧🇬🇧",
            "image_url": `https://api.marco-app.com/api/image/london.jpg`,
            "buttons": [
              {
                "type": "postback",
                "title": "Validate ✔️",
                "payload": `TRAVELINGTO_LONDON`
              },
            ]
          },
          {
            "title": "🇪🇸🇪🇸 Barcelona 🇪🇸🇪🇸",
            "image_url": `https://api.marco-app.com/api/image/barcelona.jpg`,
            "buttons": [
              {
                "type": "postback",
                "title": "Validate ✔️",
                "payload": `TRAVELINGTO_BARCELONA`
              },
            ]
          },
          // {
          //   "title": "🇵🇹🇵🇹 Lisbon 🇵🇹🇵🇹",
          //   "image_url": `https://api.marco-app.com/api/image/lisbon.png`,
          //   "buttons": [
          //     {
          //       "type": "postback",
          //       "title": "Validate ✔️",
          //       "payload": `TRAVELINGTO_LISBON`
          //     },
          //   ]
          // },
          // {
          //   "title": "🇮🇹🇮🇹 Roma 🇮🇹🇮🇹",
          //   "image_url": `https://api.marco-app.com/api/image/roma.jpg`,
          //   "buttons": [
          //     {
          //       "type": "postback",
          //       "title": "Validate ✔️",
          //       "payload": `TRAVELINGTO_ROMA`
          //     },
          //   ]
          // },
          // {
          //   "title": "🇩🇪🇩🇪 Berlin 🇩🇪🇩🇪",
          //   "image_url": `https://api.marco-app.com/api/image/berlin.jpg`,
          //   "buttons": [
          //     {
          //       "type": "postback",
          //       "title": "Validate ✔️",
          //       "payload": `TRAVELINGTO_BERLIN`
          //     },
          //   ]
          // }
        ]
      }
    }
  },
  forgetCity: {
    "text": `Excuse me, you forget to tell me which city you choose for your unforgettable vacation`,
  },
  isItFirstTime(city) {
    return {
      "text": `Great choice! I love this city! Is it your fist time in ${city}?`,
      "quick_replies": [
        {
          "content_type": "text",
          "title": "Yes",
          "payload": `FIRSTTIME_YES`,
        },
        {
          "content_type": "text",
          "title": "No",
          "payload": "FIRSTTIME_NO",
        },
      ]
    };
  },
  whenAreYouArriving(boolean, city) {
    return {
      "text": (boolean) ? `First time for everything! It will be a pleasure to help you to discover this beautiful city 😇.\nWhen will you arrive ? (you have 2 options) \n\nOption A - If you\'re not at ${city} now, Type the date (ex: 03/14/19 or 14 March 2019)\n\nOption B - If you\'re already at ${city}, please to click the button below inside to type the date`
        : `So let me show you more about this city, When will you arrive ? (you have 2 options) \n\nOption A - If you\'re not at ${city} now, Type the date (ex: 03/14/19 or 14 March 2019)\n\nOption B - If you\'re already at ${city}, please to click the button below inside to type the date`,
      "quick_replies": [
        {
          "content_type": "text",
          "title": `Already at ${city}`,
          "payload": "ALREADYINCITY",
        },
      ]
    };
  },
  whenAreYouArriving2(city) {
    return {
      "text": `Excuse me but you didn't tell me when you'll arrive to ${city} (you have 2 options)! \n\nOption A - If you\'re not at ${city} now, Type the date (ex: 03/14/19 or 14 March 2019)\n\nOption B - If you\'re already at ${city}, please to click the button below inside to type the date`,
      "quick_replies": [
        {
          "content_type": "text",
          "title": `Already at ${city}`,
          "payload": "ALREADYINCITY",
        },
      ]
    };
  },
  howManyDayAreStaying(city) {
    return {
      "text": `How many day will you stay in ${city}? (Type the duration)`,
    }
  },
  updateCityDone(city) {
    return {
      "text": `The switch for ${city} has been done ✅`,
    }
  },
  changeMyCity: {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "🇫🇷🇫🇷 Paris 🇫🇷🇫🇷",
            "image_url": `https://api.marco-app.com/api/image/paris.jpg`,
            "buttons": [
              {
                "type": "postback",
                "title": "Validate ✔️",
                "payload": `MODIFYCITY_PARIS`
              },
            ]
          },
          {
            "title": "🇬🇧🇬🇧 London 🇬🇧🇬🇧",
            "image_url": `https://api.marco-app.com/api/image/london.jpg`,
            "buttons": [
              {
                "type": "postback",
                "title": "Validate ✔️",
                "payload": `MODIFYCITY_LONDON`
              },
            ]
          },
          {
            "title": "🇪🇸🇪🇸 Barcelona 🇪🇸🇪🇸",
            "image_url": `https://api.marco-app.com/api/image/barcelona.jpg`,
            "buttons": [
              {
                "type": "postback",
                "title": "Validate ✔️",
                "payload": `MODIFYCITY_BARCELONA`
              },
            ]
          },
          // {
          //   "title": "🇵🇹🇵🇹 Lisbon 🇵🇹🇵🇹",
          //   "image_url": `https://api.marco-app.com/api/image/lisbon.png`,
          //   "buttons": [
          //     {
          //       "type": "postback",
          //       "title": "Validate ✔️",
          //       "payload": `MODIFYCITY_LISBON`
          //     },
          //   ]
          // },
          // {
          //   "title": "🇮🇹🇮🇹 Roma 🇮🇹🇮🇹",
          //   "image_url": `https://api.marco-app.com/api/image/roma.jpg`,
          //   "buttons": [
          //     {
          //       "type": "postback",
          //       "title": "Validate ✔️",
          //       "payload": `MODIFYCITY_ROMA`
          //     },
          //   ]
          // },
          // {
          //   "title": "🇩🇪🇩🇪 Berlin 🇩🇪🇩🇪",
          //   "image_url": `https://api.marco-app.com/api/image/berlin.jpg`,
          //   "buttons": [
          //     {
          //       "type": "postback",
          //       "title": "Validate ✔️",
          //       "payload": `MODIFYCITY_BERLIN`
          //     },
          //   ]
          // }
        ]
      }
    }
  },
  noMoreCityInTrip(city) {
    const cityToUpper = city[0].toUpperCase() + city.slice(1);
    return {
      "text": `Currently you're looking for ${cityToUpper}, Which city do you want to switch ?\nBy the way you have no recorded city in your upcoming trips.\nI advise you to record a new trip in the menu \"👤 My account\" -> \"🗺 New trip\"`
    }
  },
  yourCityActual(city) {
    const cityToUpper = city[0].toUpperCase() + city.slice(1);
    return {
      "text": `Currently you're looking for ${cityToUpper}, Which city do you want to switch ?`
    }
  },
  arrivalLater: {
    "text": 'Nice! Thanks, I\'ll get back to you the day before your arrival then 😉. In the meantime you can already check out what to do down there to give you some ideas 💡.',
    "quick_replies": [
      {
        "content_type": "text",
        "title": "📸 Visit",
        "payload": "SEARCH_VISIT",
      },
      {
        "content_type": "text",
        "title": "🍽 Eat",
        "payload": "SEARCH_RESTAURANT",
      },
      {
        "content_type": "text",
        "title": "🍸 Drink",
        "payload": "SEARCH_BAR",
      },
      {
        "content_type": "text",
        "title": "🚶‍️ Walk around",
        "payload": "SEARCH_DISTRICT",
      },
      {
        "content_type": "text",
        "title": "🗣 Chat with human",
        "payload": "SEARCH_HUMAN",
      }
    ]
  },
  isHereNow: {
    "text": "Thank you, you’re perfect! Now as promised here is your program for the day: "
  },
  noPropgramForThisStaying: {
    "text": "Nice! Thanks, You can check out what to do down there to give you some ideas 💡.",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "📸 Visit",
        "payload": "SEARCH_VISIT",
      },
      {
        "content_type": "text",
        "title": "🍽 Eat",
        "payload": "SEARCH_RESTAURANT",
      },
      {
        "content_type": "text",
        "title": "🍸 Drink",
        "payload": "SEARCH_BAR",
      },
      {
        "content_type": "text",
        "title": "🚶‍️ Walk around",
        "payload": "SEARCH_DISTRICT",
      },
      {
        "content_type": "text",
        "title": "🗣 Chat with human",
        "payload": "SEARCH_HUMAN",
      }
    ]
  },
  experienceMessage: {
    "text": `Great ! 🎉 ️`
  },
  myWorkMessage: {
    "text": 'Even before you think about it, I’ll instantly show you the best of Paris. You’ll be sure not to miss out on anything and stay away from tourist traps.'
  },
  excitementMessage: {
    "text": "Isn't it exciting? 🤩",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Yes",
        "payload": "EXCITEMENT_CONFIRM",
      },
      {
        "content_type": "text",
        "title": "No",
        "payload": "EXCITEMENT_CANCEL",
      }
    ]
  },
  defaultPostback: {
    "text": "Mmmh, there seems to be a problem..."
  },
  letsGoMessage: {
    "text": "Awesome!! 👌🚀"
  },
  letsGoMessage2: {
    "text": "Ok then! We're on the way there. 🧐"
  },
  noNeedMessage: {
    "text": "Oh! That's a shame! 😢"
  },
  preFeedback: {
    "text": "Nevertheless, I'd love to know why I can't help you..."
  },
  feedbackInput: {
    "text": "Could you tell me? "
  },
  preQuestionMessage: {
    "text": "Would you mind telling me with whom you are traveling ? 🤫",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "😇 I'm Alone",
        "payload": "TRAVELTYPE_ALONE",
      },
      {
        "content_type": "text",
        "title": "❤️ With my partner",
        "payload": "TRAVELTYPE_PARTNER",
      },
      {
        "content_type": "text",
        "title": "🎉 With friends",
        "payload": "TRAVELTYPE_FRIENDS",
      },
      {
        "content_type": "text",
        "title": "👨‍👩‍👧‍👦 With my family",
        "payload": "TRAVELTYPE_FAMILY",
      }
    ]
  },
  question1Message: {
    "text": "Now tell me, what do you feel like doing today?",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "📸 Visit",
        "payload": "SEARCH_VISIT",
      },
      {
        "content_type": "text",
        "title": "🍽 Eat",
        "payload": "SEARCH_RESTAURANT",
      },
      {
        "content_type": "text",
        "title": "🍸 Drink",
        "payload": "SEARCH_BAR",
      },
      {
        "content_type": "text",
        "title": "🚶‍️ Walk around",
        "payload": "SEARCH_DISTRICT",
      },
      {
        "content_type": "text",
        "title": "🗣 Chat with a human",
        "payload": "SEARCH_HUMAN",
      }
    ]
  },
  backQuestion(EVENT) {
    return {
      "text": "Do not hesitate to try something else :",
      "quick_replies": [
        {
          "content_type": "text",
          "title": "🔙 Change category",
          "payload": `CATEGORY_${EVENT}`,
        },
        {
          "content_type": "text",
          "title": "📸 Visit",
          "payload": "SEARCH_VISIT",
        },
        {
          "content_type": "text",
          "title": "🍽 Eat",
          "payload": "SEARCH_RESTAURANT",
        },
        {
          "content_type": "text",
          "title": "🍸 Drink",
          "payload": "SEARCH_BAR",
        },
        {
          "content_type": "text",
          "title": "🚶‍️ Walk around",
          "payload": "SEARCH_DISTRICT",
        },
        {
          "content_type": "text",
          "title": "🗣 Chat with a human",
          "payload": "SEARCH_HUMAN",
        }
      ]
    }
  },
  question1MessageAfterLocation: {
    "text": "I’m sure you’ll enjoy yourself here! 🙂 If you have any further queries, don’t hesitate to tell me. ",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "📸 Visit",
        "payload": "SEARCH_VISIT",
      },
      {
        "content_type": "text",
        "title": "🍽 Eat",
        "payload": "SEARCH_RESTAURANT",
      },
      {
        "content_type": "text",
        "title": "🍸 Drink",
        "payload": "SEARCH_BAR",
      },
      {
        "content_type": "text",
        "title": "🚶‍️ Walk around",
        "payload": "SEARCH_DISTRICT",
      },
      {
        "content_type": "text",
        "title": "🗣 Chat with a human",
        "payload": "SEARCH_HUMAN",
      }
    ]
  },
  question1MessageAfterLater: {
    "text": "Enjoy yourself in the meantime and if you have any further queries, don’t hesitate to tell me. ",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "📸 Visit",
        "payload": "SEARCH_VISIT",
      },
      {
        "content_type": "text",
        "title": "🍽 Eat",
        "payload": "SEARCH_RESTAURANT",
      },
      {
        "content_type": "text",
        "title": "🍸 Drink",
        "payload": "SEARCH_BAR",
      },
      {
        "content_type": "text",
        "title": "🚶‍️ Walk around",
        "payload": "SEARCH_DISTRICT",
      },
      {
        "content_type": "text",
        "title": "🗣 Chat with a human",
        "payload": "SEARCH_HUMAN",
      }
    ]
  },
  question1MessageAfterDistrict: {
    "text": "If you have any further queries, don’t hesitate to tell me",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "🔙 other districts",
        "payload": "SEARCH_DISTRICT1",
      },
      {
        "content_type": "text",
        "title": "📸 Visit",
        "payload": "SEARCH_VISIT",
      },
      {
        "content_type": "text",
        "title": "🍽 Eat",
        "payload": "SEARCH_RESTAURANT",
      },
      {
        "content_type": "text",
        "title": "🍸 Drink",
        "payload": "SEARCH_BAR",
      },
      {
        "content_type": "text",
        "title": "🗣 Chat with a human",
        "payload": "SEARCH_HUMAN",
      }
    ]
  },
  question1MessageListView: {
    "text": "If you have any further queries, don’t hesitate to tell me.",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "📸 Visit",
        "payload": "SEARCH_VISIT",
      },
      {
        "content_type": "text",
        "title": "🍽 Eat",
        "payload": "SEARCH_RESTAURANT",
      },
      {
        "content_type": "text",
        "title": "🍸 Drink",
        "payload": "SEARCH_BAR",
      },
      {
        "content_type": "text",
        "title": "🚶‍️ Walk around",
        "payload": "SEARCH_DISTRICT",
      },
      {
        "content_type": "text",
        "title": "🗣 Chat with a human",
        "payload": "SEARCH_HUMAN",
      }
    ]
  },
  nothingMore: {
    "text": "Sorry! You have nothing in your favorite right now. You can add one when you click on tell me more and later 😉. \nIf you have any other queries, don’t hesitate to tell me.",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "📸 Visit",
        "payload": "SEARCH_VISIT",
      },
      {
        "content_type": "text",
        "title": "🍽 Eat",
        "payload": "SEARCH_RESTAURANT",
      },
      {
        "content_type": "text",
        "title": "🍸 Drink",
        "payload": "SEARCH_BAR",
      },
      {
        "content_type": "text",
        "title": "🚶‍♂️ Walk around",
        "payload": "SEARCH_DISTRICT",
      },
      {
        "content_type": "text",
        "title": "🗣 Chat with a human",
        "payload": "SEARCH_HUMAN",
      }
    ]
  },
  rememberLocation: (eventID, kindEvent) => {
    return {
      "text": "Could you just help me remember your location? We haven't talked in a while. 🙈",
      "quick_replies": [
        {
          "content_type": "location",
        },
        {
          "content_type": "text",
          "title": "No, use my old location",
          "payload": `USEOLDLOCATIONEVENT_${kindEvent}:${eventID}`,
        }
      ]
    }
  },
  updateLocation: () => {
    return {
      "text": "You can update your location, if you want, by clicking the button.",
      "quick_replies": [
        {
          "content_type": "location",
        },
        {
          "content_type": "text",
          "title": "No",
          "payload": `NOUPDATELOCATION`,
        }
      ]
    }
  },
  askLocation: (nameUser, eventID, kindEvent) => {
    return {
      "text": `I love your determination! 👊. Don’t worry though ${nameUser}, your data is safe with me and won’t be used any other way.`,
      "quick_replies": [
        {
          "content_type": "location",
          "title": "Yes",
          "payload": `YESLOCATIONEVENT:${eventID}`,
        },
        {
          "content_type": "text",
          "title": "No",
          "payload": `NOLOCATIONEVENT_${kindEvent}:${eventID}`,
        }
      ]
    }
  },
  sendItinerary: (origin, destination) => {
    return {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Just click on the button to see the itinerary. 👇‍️",
          "buttons": [
            {
              "type": "web_url",
              "url": `https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${destination.lat},${destination.lng}/`,
              "title": "🚇🚎 Itinerary 📍",
              "webview_height_ratio": "full",
              "messenger_extensions": "false",
            }
          ]
        }
      }
    }
  },
  sendLocation: (destination, eventName) => {
    return {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "It's here, on the map 👇‍️",
          "buttons": [
            {
              "type": "web_url",
              "url": `https://www.google.com/maps/dir//${destination.lat},${destination.lng}/`,
              "title": `📍 ${eventName}`,
              "webview_height_ratio": "full",
              "messenger_extensions": "false",
            }
          ]
        }
      }
    }
  },
  noLocationEvent: (eventName) => {
    return {
      "text": `I understand. ☺️ Let me still give you the address for ${eventName}.  You can also directly see it on the map by clicking here.`
    }
  },
  noLocationEvent2: (eventAddress) => {
    return {
      "text": `📍 ${eventAddress}`
    }
  },
  selectionSite: {
    "text": "Perfect! 🎉",
  },
  saveLater: {
    "text": "That’s fine, no problem ! I’ll keep it somewhere safe for later then! ❤️",
  },
  selectionSite2: {
    "text": "I just need you to tell the kind of places you’re looking forward to visiting.\n "
  },
  selectionSiteType: {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Historical",
            "image_url": "https://api.marco-app.com/api/image/minArc.jpg",
            "subtitle": "Part of the french heritage.",
            "buttons": [
              {
                "type": "postback",
                "title": "Historical",
                "payload": "SITE_HISTORICAL"
              }
            ]
          },
          {
            "title": "Secret",
            "image_url": "https://api.marco-app.com/api/image/minGalery.jpg",
            "subtitle": "Atypical and hidden places to discover the authentic Paris.",
            "buttons": [
              {
                "type": "postback",
                "title": "Secret",
                "payload": "SITE_SECRET"
              }
            ]
          },
          {
            "title": "Must see",
            "image_url": "https://api.marco-app.com/api/image/minTourEiffel.jpg",
            "subtitle": "All the must see of Paris.",
            "buttons": [
              {
                "type": "postback",
                "title": "Must see",
                "payload": "SITE_FAMOUS"
              }
            ]
          },
          {
            "title": "Cultural",
            "image_url": "https://api.marco-app.com/api/image/minLouvre.jpg",
            "subtitle": "Paris will share some of its culture.",
            "buttons": [
              {
                "type": "postback",
                "title": "Cultural",
                "payload": "SITE_CULTURAL"
              }
            ]
          },
          {
            "title": "Other",
            "image_url": "https://api.marco-app.com/api/image/minStChap.jpg",
            "subtitle": "So many other things to discover.",
            "buttons": [
              {
                "type": "postback",
                "title": "Other",
                "payload": "SITE_OTHER"
              }
            ]
          },
        ]
      }
    }
  },
  selectionBar: {
    "text": "Awesome! 👌",
  },
  selectionBar2: {
    "text": "Just tell me, what vibe are you into? "
  },
  selectionBarType: {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Trendy",
            "image_url": "https://api.marco-app.com/api/image/minTrendy.jpg",
            "subtitle": "Perfect for a saturday night.",
            "buttons": [
              {
                "type": "postback",
                "title": "Trendy",
                "payload": "BAR_TRENDY"
              }
            ]
          },
          {
            "title": "Atypical",
            "image_url": "https://api.marco-app.com/api/image/minAtypicalBar.jpg",
            "subtitle": "Perfect for discovering new places to drink a cocktail.",
            "buttons": [
              {
                "type": "postback",
                "title": "Atypical",
                "payload": "BAR_ATYPICAL"
              }
            ]
          },
          {
            "title": "High class",
            "image_url": "https://api.marco-app.com/api/image/minHighClass.jpg",
            "subtitle": "The prettiest bars of Paris.",
            "buttons": [
              {
                "type": "postback",
                "title": "High class",
                "payload": "BAR_HIGHCLASS"
              }
            ]
          },
          {
            "title": "Pubs",
            "image_url": "https://api.marco-app.com/api/image/minPub.jpg",
            "subtitle": "Let's go watch the wolrd cup tonight.",
            "buttons": [
              {
                "type": "postback",
                "title": "Pubs",
                "payload": "BAR_PUB"
              }
            ]
          },
          {
            "title": "Cafés",
            "image_url": "https://api.marco-app.com/api/image/minCafe.jpg",
            "subtitle": "Enjoy a terasse on a nice sunny afternoon.",
            "buttons": [
              {
                "type": "postback",
                "title": "Cafés",
                "payload": "BAR_CAFE"
              }
            ]
          },
          {
            "title": "Wine bars",
            "image_url": "https://api.marco-app.com/api/image/minWineBar.jpg",
            "subtitle": "Perfect for tasting famous wines.",
            "buttons": [
              {
                "type": "postback",
                "title": "Wine bars",
                "payload": "BAR_WINE"
              }
            ]
          },

        ]
      }
    }
  },
  selectionRestaurant: {
    "text": "Perfect! 👌",
  },
  selectionRestaurant2: {
    "text": "What type of meal do you feel like having ?"
  },
  selectionRestaurantType: {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Gastronomic",
            "image_url": "https://api.marco-app.com/api/image/minGastronomy.jpg",
            "subtitle": "The finest french cuisine from incredible chefs.",
            "buttons": [
              {
                "type": "postback",
                "title": "Gastronomic",
                "payload": "RESTAURANT_GASTRONOMY"
              }
            ]
          },
          {
            "title": "Healthy",
            "image_url": "https://api.marco-app.com/api/image/minVeggie.jpg",
            "subtitle": "The best of healthy food.",
            "buttons": [
              {
                "type": "postback",
                "title": "Healthy",
                "payload": "RESTAURANT_VEGGIE"
              }
            ]
          },
          {
            "title": "Brunch",
            "image_url": "https://api.marco-app.com/api/image/minBrunch.jpg",
            "subtitle": "A typical parisian sunday breakfast.",
            "buttons": [
              {
                "type": "postback",
                "title": "Brunch",
                "payload": "RESTAURANT_BRUNCH"
              }
            ]
          },
          {
            "title": "Street food",
            "image_url": "https://api.marco-app.com/api/image/minStreetfood.jpg",
            "subtitle": "The finest ready to eat parisian food.",
            "buttons": [
              {
                "type": "postback",
                "title": "Street food",
                "payload": "RESTAURANT_STREET"
              }
            ]
          },
          {
            "title": "Traditional",
            "image_url": "https://api.marco-app.com/api/image/minTraditional.jpg",
            "subtitle": "Typical french food and restaurants.",
            "buttons": [
              {
                "type": "postback",
                "title": "Traditional",
                "payload": "RESTAURANT_TRADITIONAL"
              }
            ]
          },
          {
            "title": "Others",
            "image_url": "https://api.marco-app.com/api/image/minRestaurant.jpg",
            "subtitle": "Let(s start the discovery.",
            "buttons": [
              {
                "type": "postback",
                "title": "Others",
                "payload": "RESTAURANT_OTHER"
              }
            ]
          },

        ]
      }
    }
  },
  selectionDistrict: {
    "text": "‍Great! 🚀‍️",
  },
  selectionDistrict2: {
    "text": " Oh but wait, I don’t know where you’d like to go. Would you mind telling me?"
  },
  selectionDistrictType(city, page) {
    const elementsDistrict = indexElementDistrict(city, parseInt(page));
    const buttonsDistrict =
      limitPageDistrict(city) <= page ? null :
        [{
          "title": "View more ➕",
          "type": "postback",
          "payload": `SEARCH_DISTRICTAT${parseInt(page)+1}`
        }];
    return {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "list",
          "top_element_style": "compact",
          "elements": elementsDistrict,
          "buttons": buttonsDistrict
        }
      }
    }
  },
  nothingInThisDistrict: {
    "text": "Sorry, I have nothing to show 😔, though, you can always check out other districts or do something else.",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "🔙 other districts",
        "payload": `SEARCH_OTHERDISTRICT`,
      },
      {
        "content_type": "text",
        "title": "📸 Visit",
        "payload": "SEARCH_VISIT",
      },
      {
        "content_type": "text",
        "title": "🍽 Eat",
        "payload": "SEARCH_RESTAURANT",
      },
      {
        "content_type": "text",
        "title": "🍸 Drink",
        "payload": "SEARCH_BAR",
      },
      {
        "content_type": "text",
        "title": "🗣 Chat with a human",
        "payload": "SEARCH_HUMAN",
      }
    ]
  },
  findNothing: {
    "text": "Sorry I'm actually very young and still learning some things. Maybe try something else? ",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "📸 Visit",
        "payload": "SEARCH_VISIT",
      },
      {
        "content_type": "text",
        "title": "🍽 Eat",
        "payload": "SEARCH_RESTAURANT",
      },
      {
        "content_type": "text",
        "title": "🍸 Drink",
        "payload": "SEARCH_BAR",
      },
      {
        "content_type": "text",
        "title": "🚶‍️ Walk around",
        "payload": "SEARCH_DISTRICT",
      },
      {
        "content_type": "text",
        "title": "🗣 Chat with a human",
        "payload": "SEARCH_HUMAN",
      }
    ]
  },
  viewMore: (description, kindElement, eventID) => {
    return {
      "text": `${description}`,
      "quick_replies": [
        {
          "content_type": "text",
          "title": "Let's go! 🚀",
          "payload": `GOING_${kindElement}:${eventID}`,
        },
        {
          "content_type": "text",
          "title": "Later ❤️",
          "payload": `LATER_${kindElement}:${eventID}`,
        },
      ]
    }
  },
  priceMessage(type, tag) {
    return {
      "text": type === 'RESTAURANT' ? "Yummy !! 😋\nNow, what price range do you have in mind?" : "Cheers! 🍻\nNow, how much are planning on spending?",
      "quick_replies": [
        {
          "content_type": "text",
          "title": "💰",
          "payload": `PRICE${type}_${tag}_ONE`,
        },
        {
          "content_type": "text",
          "title": "💰💰-💰💰💰",
          "payload": `PRICE${type}_${tag}_TWO-THREE`,
        },
        // {
        //   "content_type": "text",
        //   "title": "💸💸💸",
        //   "payload": `PRICE${type}_${tag}_`,
        // },
        {
          "content_type": "text",
          "title": "💰💰💰💰",
          "payload": `PRICE${type}_${tag}_FOUR`,
        }
      ]
    }
  },
  fetchRestaurantsMessage: {
    "text": "Ok! Check out what I found for you:"
  },
  fetchVisitsMessage: {
    "text": "Sure thing!! This is what I found for you: "
  },
  fetchBarsMessage: {
    "text": "Thanks! Look at what I found just for you:"
  },
  jokeMarco(EVENT) {
    const indexJoke = Math.floor(Math.random() * Math.floor(anecdotes.length - 1));
    return {
      "text": `Sorry! There's nothing left in stock... \nBut here's an anecdote for you while we work on it: \n${anecdotes[indexJoke]}`,
      "quick_replies": [
        {
          "content_type": "text",
          "title": "🔙 Change category",
          "payload": `CATEGORY_${EVENT}`,
        },
        {
          "content_type": "text",
          "title": "📸 Visit",
          "payload": "SEARCH_VISIT",
        },
        {
          "content_type": "text",
          "title": "🍽 Eat",
          "payload": "SEARCH_RESTAURANT",
        },
        {
          "content_type": "text",
          "title": "🍸 Drink",
          "payload": "SEARCH_BAR",
        },
        {
          "content_type": "text",
          "title": "🚶‍️ Walk around",
          "payload": "SEARCH_DISTRICT",
        },
        {
          "content_type": "text",
          "title": "🗣 Chat with a human",
          "payload": "SEARCH_HUMAN",
        }
      ]
    }
  },
  jokeMarco2() {
    const indexJoke = Math.floor(Math.random() * Math.floor(anecdotes.length - 1));
    return {
      "text": `Sorry! There's nothing left in stock... \nBut here's an anecdote for you while we work on it: \n${anecdotes[indexJoke]}`,
      "quick_replies": [
        {
          "content_type": "text",
          "title": "📸 Visit",
          "payload": "SEARCH_VISIT",
        },
        {
          "content_type": "text",
          "title": "🍽 Eat",
          "payload": "SEARCH_RESTAURANT",
        },
        {
          "content_type": "text",
          "title": "🍸 Drink",
          "payload": "SEARCH_BAR",
        },
        {
          "content_type": "text",
          "title": "🚶‍️ Walk around",
          "payload": "SEARCH_DISTRICT",
        },
        {
          "content_type": "text",
          "title": "🗣 Chat with a human",
          "payload": "SEARCH_HUMAN",
        }
      ]
    }
  },
  helpMessage: {
    "text": "You're lost? \nMarco is a personal travel assistant giving the best insider tips just for you.\n\nYou can manage your account by checking out the menu. 😉"
  },
  unsubscribeMessage: {
    "text": "Done! ✅ Could you tell me in a few words why? It will help me getting better. 🙂 \n\n\nNevertheless if you want to delete your account, email us at hello@marcobot.io "
  },
  subscribeMessage: {
    "text": "Done! ✅, I'm happy to be able to continue talking with you my friend 🙂"
  },
  unsubscribeMessageError: {
    "text": "Oops! Something wrong happened... Please email at hello@marcobot.io"
  },
  startTalkingWithHuman: {
    "text": "Okay! An awesome Parisian is gonna answer your request ASAP!\n To stop chatting just type \"I want Marco back\" or \"Stop\". \nI\'ll come back for you. See you soon 🙂 ",
  },
  startTalkingWithHuman2: {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": `You started to chat with an awesome Parisian that'll answer your requests ASAP! 🙂`,
            "subtitle": `To stop chatting just type \"I want Marco back\", \"Stop\" or click the button.`,
            "buttons": [
              {
                "type": "postback",
                "title": "Stop chat",
                "payload": "STOPTALKING_"
              },
            ]
          }
        ]
      }
    }
  },

  stopTalkingWithHuman(name){
    return {
      "text": `Hey ${name}, I missed you. I\'m really happy to talk with you again 🙂. How can I help you?`,
      "quick_replies": [
        {
          "content_type": "text",
          "title": "📸 Visit",
          "payload": "SEARCH_VISIT",
        },
        {
          "content_type": "text",
          "title": "🍽 Eat",
          "payload": "SEARCH_RESTAURANT",
        },
        {
          "content_type": "text",
          "title": "🍸 Drink",
          "payload": "SEARCH_BAR",
        },
        {
          "content_type": "text",
          "title": "🚶‍️ Walk around",
          "payload": "SEARCH_DISTRICT",
        },
        {
          "content_type": "text",
          "title": "🗣 Chat with a human",
          "payload": "SEARCH_HUMAN",
        }
      ]
    }
  },
  shareMessage: {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Marco",
            "image_url": `https://api.marco-app.com/api/image/marcoSharePhoto.jpg`,
            "subtitle": "Your own personal travel assistant 24h/24h on Facebook Messenger. ✈️",
            "buttons": [
              {
                "type": "element_share",
                "share_contents": {
                  "attachment": {
                    "type": "template",
                    "payload": {
                      "template_type": "generic",
                      "elements": [
                        {
                          "title": "Marco",
                          "image_url": `https://api.marco-app.com/api/image/marcoSharePhoto.jpg`,
                          "subtitle": "Your own personal travel assistant 24h/24h on Facebook Messenger. ✈️",
                          "buttons": [{
                            "type": "web_url",
                            "url": "http://m.me/marco.bot.paris",
                            "title": "Start me"
                          }
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },
  messageOfItineraryNotification(name, city, numberDay, programs_id) {
    const dayString = numberDayString[numberDay];
    const cityToLowerCase = city[0].toUpperCase() + city.slice(1);
    return {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": `Hey ${name} 😊, you can find here your program for your ${dayString} day in ${cityToLowerCase}`,
          "buttons": [
            {
              "type": "postback",
              "title": "Start ⚡️",
              "payload": `STARTITINERARY_${programs_id}:${parseInt(numberDay)}`
            }
          ]
        }
      }
    }
  },
  messageOfItineraryNotification2(city, numberDay, programs_id) {
    const dayString = numberDayString[numberDay];
    const cityToLowerCase = city[0].toUpperCase() + city.slice(1);
    return {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": `Your program for your ${dayString} day in ${cityToLowerCase}`,
          "buttons": [
            {
              "type": "postback",
              "title": "Start ⚡️",
              "payload": `STARTITINERARY_${programs_id}:${parseInt(numberDay)}`
            }
          ]
        }
      }
    }
  },
  itineraryNotifications(description, numberDay, page, programs_id) {
    return {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": `${description}`,
          "buttons": [
            {
              "type": "postback",
              "title": "Next",
              "payload": `ITINERARYNEXT_${programs_id}:${parseInt(numberDay)}:${parseInt(page) + 1}`
            }
          ]
        }
      }
    }
  },
  messageForTomorrow(name, city) {
    const cityToLowerCase = city[0].toUpperCase() + city.slice(1);
    return {
      "text": `Hey ${name}, ready for tomorrow ? ${cityToLowerCase} is waiting for you 🤩.\nTomorrow morning I'll send you your personal program. But now, you can check out what to do`,
      "quick_replies": [
        {
          "content_type": "text",
          "title": "📸 Visit",
          "payload": "SEARCH_VISIT",
        },
        {
          "content_type": "text",
          "title": "🍽 Eat",
          "payload": "SEARCH_RESTAURANT",
        },
        {
          "content_type": "text",
          "title": "🍸 Drink",
          "payload": "SEARCH_BAR",
        },
        {
          "content_type": "text",
          "title": "🚶‍️ Walk around",
          "payload": "SEARCH_DISTRICT",
        },
        {
          "content_type": "text",
          "title": "🗣 Chat with human",
          "payload": "SEARCH_HUMAN",
        }
      ]
    }
  },
  textBeforeShare(url) {
    return {
      "text": `You can find this program in its entirety 👉 ${url}\nIf you have fun, you can share this one with your friends\nI'm counting on you to make me grow! ❤️`,
    }
  },
  shareOrFindUrlMedium: {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Share Marco ❤",
            "subtitle": "Marco is your personal travel assistant available 24h/24h on Facebook Messenger! ✈",
            "image_url": "https://api.marco-app.com/api/image/FBProfileRe.png",
            "buttons": [
              {
                "type": "element_share",
                "share_contents": {
                  "attachment": {
                    "type": "template",
                    "payload": {
                      "template_type": "generic",
                      "elements": [
                        {
                          "title": `Share`,
                          "subtitle": `Marco is your personal travel assistant available 24h/24h on Facebook Messenger! ✈️`,
                          "image_url": `https://api.marco-app.com/api/image/FBProfileRe.png`,
                          "default_action": {
                            "type": "web_url",
                            "url": "https://www.messenger.com/t/marco.bot.paris",

                          },
                          "buttons": [
                            {
                              "type": "web_url",
                              "url": `https://www.messenger.com/t/marco.bot.paris`,
                              "title": "Discover Marco"
                            },
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        ],
      }
    }
  },
}
;
