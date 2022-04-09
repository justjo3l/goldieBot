'use strict';

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const express = require("express");

const routes = require("./routes/web.js");

const bodyParser = require("body-parser");

var jotform = require("jotform")

let app = express();

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init all web routes
routes.initWebRoutes(app);

// Jotform api
/*
jotform.options({
	debug: true,
	apiKey: "915bc69aedd3fa83d163129376a8bc76"
});

jotform.getForm("220972012457856").then(function(r) {
    console.log(r);
});
*/

// jotform.get(function(response){
//     for(var i=0; i<response.length; i++){
//         console.log( "<li> " + response[i].title);
//     }
// });