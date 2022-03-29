const express = require("express");
const homeController = require('../controllers/homeController.js');
const chatController = require('../controllers/chatController.js');

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomepage);
    router.post("/webhook", chatController.postWebhook);
    router.get("/webhook", chatController.getWebhook);
    return app.use("/", router);
};

module.exports = {
    initWebRoutes: initWebRoutes
};