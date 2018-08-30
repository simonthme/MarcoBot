/**
 * Created by corentin on 29/08/2018.
 */
const district2 = [
  {
    "title": "Westminster",
    "image_url": "https://api.marco-app.com/api/image/minWestminster.jpg",
    "subtitle": "Center of London.",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_westminster"
      }
    ]
  },
  {
    "title": "Around Convent Garden",
    "image_url": "https://api.marco-app.com/api/image/minCoventGarden.jpg",
    "subtitle": "It's located in the West End of London",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_covent_garden"
      }
    ]
  },
  {
    "title": "Soho",
    "image_url": "https://api.marco-app.com/api/image/minSoho.jpg",
    "subtitle": "Soho is a vibrant neighborhood with an intense nightlife.",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_soho"
      }
    ]
  },
];

module.exports = district2;