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


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", verificationController);
app.post("/", messageWebhookController);

app.listen(PORT, () => console.log("server listening to port ", PORT));
