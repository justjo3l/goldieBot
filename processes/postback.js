const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
module.exports = function processPostback(event) {
  const senderID = event.sender.id;
  const payload = event.postback.payload;
  if (payload === 'WELCOME') {
     request({ url: "https://graph.facebook.com/v3.3/" + senderID,
     qs: { access_token: process.env.PAGE_ACCESS_TOKEN,
           fields: "first_name"
         },
     method: "GET"
  }, function(error, response, body) {
    let greeting = '';
    if (error) {
      console.error("Error getting user name: " + error);
    } else {
      let bodyObject = JSON.parse(body);
      console.log(bodyObject);
      let first_name = bodyObject.first_name;
      greeting = "Hello " + first_name  + ". ";
    }
    let message = greeting + "Welcome to Healthbot. Hope you are doing good today!";
    sendMessage(senderID, {text: message}).then(() => {
      sendMessage(senderID, { text: '🎈' });
    });
  });
 }
}