/**
 * Created by corentin on 29/08/2018.
 */
const district1 = [
  {
    "title": "Around Le Louvre",
    "image_url": "https://api.marco-app.com/api/image/minLouvreDistrict.jpg",
    "subtitle": "Center of Paris.",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_louvre"
      }
    ]
  },
  {
    "title": "Latin quarter",
    "image_url": "https://api.marco-app.com/api/image/minLatin.jpg",
    "subtitle": "The left bank's true student & intellectual center.",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_latin_quarter"
      }
    ]
  },
  {
    "title": "Around the Tour Eiffel",
    "image_url": "https://api.marco-app.com/api/image/minEiffelDistrict.jpg",
    "subtitle": "Hidden behind walls you'll find embassies and institutional buildings.",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_eiffel_tour"
      }
    ]
  },
];

module.exports = district1;