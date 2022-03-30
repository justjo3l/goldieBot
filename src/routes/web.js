const express = require("express");
const homeController = require('../controllers/homeController.js');
const chatController = require('../controllers/chatController.js');

let router = express.Router();

postWebhook2 = (req, res) => {
    let body = req.body;

    console.log("PW runs");
  
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but ß
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        console.log("Message Received");
        console.log(webhook_event);
      });
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
};

let initWebRoutes = (app) => {

    console.log("IWR runs");

    //router.get("/", homeController.getHomepage);
    router.post("/webhook", postWebhook2);
    //router.get("/webhook", chatController.getWebhook);

    console.log(router);

    return app.use("/", router);
};

module.exports = {
    initWebRoutes: initWebRoutes
};