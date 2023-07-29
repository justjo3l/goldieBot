import request from 'request';
import sendMessage from '../templates/sendMessage.js';
import { getDinoMenu } from '../database.js';
export default function processMessage(event) {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
      if (message.text.startsWith("dino") || message.text.startsWith("Dino")) {
        // Get date as second part of message text
        let date = message.text.split(" ")[1];
        // Get number of days since 29/05/2023
        let days = Math.floor((new Date(date) - new Date("05/29/2023")) / (1000 * 60 * 60 * 24));
        console.log("DAYS: " + days);
        days =  days % 21;
        console.log("DAYS 2: " + days);
        let reply = 'No menu found for that date.'
        getDinoMenu(days).then((menu) => {
          if (menu != null) {
            reply = menu.breakfast;
            reply.replace(/\\n/g, '\n')
          }
          sendMessage(senderID, {text: reply}).then(() => {
            console.log("Dino Message sent!");
          }).catch((err) => {
            console.log("Dino Message error");
          });
        });
      } else {
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
          }

          reply += "You said \"" + message.text + "\"!";
          sendMessage(senderID, {text: reply}).then(() => {
            console.log("Message sent!");
          });
        });
      }
    }
  }
}