const express = require("express");
const homeController = require('../controllers/homeController.js');
const chatController = require('../controllers/chatController.js');

let router = express.Router();

let initWebRoutes = (app) => {

    console.log("IWR runs");
    console.log(chatController.postWebhook);

    //router.get("/", homeController.getHomepage);
    router.post("/webhook", chatController.postWebhook.apply);
    //router.get("/webhook", chatController.getWebhook);

    console.log(router);

    return app.use("/", router);
};

exports = {
    initWebRoutes: initWebRoutes
};