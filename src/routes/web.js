const express = require("express");
const homeController = require('../controllers/homeController.js');
const chatController = require('../controllers/chatController.js');

let router = express.Router();

let initWebRoutes = (app) => {

    console.log("IWR runs");

    console.log(chatController.module);
    console.log("----");
    console.log(chatController);

    //router.get("/", homeController.getHomepage);
    router.post("/webhook", chatController.module);
    //router.get("/webhook", chatController.getWebhook);

    console.log(router);

    return app.use("/", router);
};

module.exports = {
    initWebRoutes: initWebRoutes
};