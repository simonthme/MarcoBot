/**
 * Created by corentin on 29/08/2018.
 */
const district1 = [
  {
    "title": "City",
    "image_url": "https://api.marco-app.com/api/image/minCity.jpg",
    "subtitle": "Tt's both the historic heart and the geographical center of the city of London",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_city"
      }
    ]
  },
  {
    "title": "Camden",
    "image_url": "https://api.marco-app.com/api/image/minCamden.jpg",
    "subtitle": "Consolidation of Hampstead, Holborn and St. Pancras Districts, has more than 210,000 inhabitants.",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_camden"
      }
    ]
  },
  {
    "title": "Notting Hill",
    "image_url": "https://api.marco-app.com/api/image/minNottingHill.jpg",
    "subtitle": "West of the center of London",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_notting_hill"
      }
    ]
  },
];

module.exports = district1;