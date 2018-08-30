/**
 * Created by corentin on 29/08/2018.
 */
const district1 = [
  {
    "title": "Around Plaça de Catalunya",
    "image_url": "https://api.marco-app.com/api/image/minPlacacatalunya.jpg",
    "subtitle": "Plaça de Catalunya is one of the main squares of Barcelona",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_placa_catalunya"
      }
    ]
  },
  {
    "title": "Gothic Quarter",
    "image_url": "https://api.marco-app.com/api/image/minGothicQuarter.jpg",
    "subtitle": "One of the most popular neighborhoods in the Old Town district of Barcelona",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_gothic_quarter"
      }
    ]
  },
  {
    "title": "Around Sagrada Familia",
    "image_url": "https://api.marco-app.com/api/image/minSagradaFamilia.jpg",
    "subtitle": "Neighborhood around one of the most famous basilicas in Europe",
    "buttons": [
      {
        "type": "postback",
        "title": "Gooooo! 🚀",
        "payload": "AROUND_sagrada_familia"
      }
    ]
  },

];

module.exports = district1;