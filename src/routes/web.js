import express from "express";
import handleWebHelloWorld from "../controllers/homeController.js";
import postWebhook from "../controllers/chatController.js";
import getWebhook from "../controllers/chatController.js";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", handleWebHelloWorld);
    router.post("/webhook", postWebhook);
    router.get("/webhook", getWebhook);
    return app.use("/", router);
};

module.exports = {
    initWebRoutes: initWebRoutes
};