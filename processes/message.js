const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
module.exports = function processMessage(event) {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
      console.log("Text received!");

      let reply = '';

      // Sending a GET request to get user's first name
      request({ url: "https://graph.facebook.com/v3.3/" + senderID,
          qs: { access_token: process.env.PAGE_ACCESS_TOKEN,
                fields: "first_name"
              },
          method: "GET"
        }, function(error, response, body) {
        if (error) {
          console.error("Error getting user name: " + error);
        } else {
          let bodyObject = JSON.parse(body);
          console.log(bodyObject);
          let first_name = bodyObject.first_name;
          reply = "Hello " + first_name + "! ";
          console.log(reply);
        }
      });

      reply += "You said \"" + message.text + "\"!";
      sendMessage(senderID, {text: reply}).then(() => {
        console.log("Message sent!");
      });
    }
  }
}