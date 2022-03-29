import express from "express";
import homeController from "../controllers/homeController.js";
import chatController from "../controllers/chatController.js";

let router = express.Router();

export default initWebRoutes = (app) => {
    router.get("/", homeController.handleWebHelloWorld);
    router.post("/webhook", chatController.postWebhook);
    router.get("/webhook", chatController.getWebhook);
    return app.use("/", router);
};

module.exports = initWebRoutes;