/**
 * Created by corentin on 27/04/2018.
 */

const express = require("express");
const bodyParser = require("body-parser");
const Config = require("./config");
const app = express();
const PORT = Config.category[Config.indexCategory].port;
const verificationController = require("./controllers/verification");
const messageWebhookController = require("./controllers/messageWebhook");
const apiMessenger = require('./helpers/apiMessenger');
const product_data = require('./messenger/product_data');
const axios = require('axios');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get("/", verificationController);
app.post("/", messageWebhookController);

axios.post(Config.category[Config.indexCategory].authUrlMarcoApi, {clientId: Config.clientId, clientSecret: Config.clientSecret, grantType: 'server'})
  .then(res => {
    Config.accessTokenMarcoApi = res.data.token;
  })
  .catch(err => console.log(err));

//TODO: décommenter quand api recommendation sera disponible
axios.post(Config.category[Config.indexCategory].authUrlRecommendationApi, {clientId: Config.clientId, clientSecret: Config.clientSecret, grantType: 'server'})
  .then(res => {
    Config.accessTokenRecommendationApi = res.data.token;
  })
  .catch(err => console.log(err));


app.get('/setup', (req, res) => {
  apiMessenger.callbackStartButton(product_data.getStartedData)
    .then(response => {
        console.log("start call");
	console.log(response);
      return apiMessenger.callbackStartButton(product_data.menuData)
    })
    .then(response => {
      console.log("menu call");
      console.log(response);
      return apiMessenger.callbackStartButton(product_data.welcomeMessage)
    })
    .then(response => {
      console.log("welcome message call");
	console.log(response)
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.listen(PORT, () => console.log("server listening to port ", PORT));
