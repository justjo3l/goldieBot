'use strict';

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const express = require("express");

const routes = require("./routes/web.js");

const bodyParser = require("body-parser");

let app = express();

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init all web routes
routes.initWebRoutes(app);