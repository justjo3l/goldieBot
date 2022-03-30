const express = require("express");
const homeController = require('../controllers/homeController.js');
const chatController = require('../controllers/chatController.js');

let router = express.Router();

let initWebRoutes = (app) => {

    console.log("IWR runs");

    //router.get("/", homeController.getHomepage);
    router.post("/webhook", chatController.postWebhook(req, res));
    //router.get("/webhook", chatController.getWebhook);

    console.log(router);

    return app.use("/", router);
};

module.exports = {
    initWebRoutes: initWebRoutes
};