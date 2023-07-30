import request from 'request';
import sendMessage from '../templates/sendMessage.js';
import { getDinoMenu } from '../database.js';
import replaceNewLine, { calculateTime } from '../util/helper.js';

function getDaysFromDate(date) {
  date = calculateTime(new Date(date), 10);
  let compareDate = calculateTime(new Date("05/29/2023"), 10);
  let days = Math.floor((date - compareDate) / (1000 * 60 * 60 * 24));
  days =  days % 21;
  return days;
}

function dinoReplyHandler(days, time, option) {
  let reply = '';
  getDinoMenu(days).then((menu) => {
    if (menu != null) {
      if (option == "breakfast" || option == "Breakfast" || time > 0 && time <= 1000) {
        reply = "BREAKFAST:\n\n";
        reply += replaceNewLine(menu.breakfast);
      } else if (option == "brunch" || option == "Brunch" || time < 1200 && menu.brunch != "") {
        reply = "BRUNCH:\n\n";
        reply += replaceNewLine(menu.brunch);
      } else if (option == "lunch" || option == "Lunch" || time <= 1415) {
        reply = "LUNCH:\n\n";
        reply += replaceNewLine(menu.lunch);
      } else {
        reply = "DINNER:\n\n";
        reply += replaceNewLine(menu.dinner);
        reply += "\n\nDESSERT:\n\n";
        reply += replaceNewLine(menu.dessert);
      }
      replySender(reply);
    }
  }).catch((err) => {
    reply = 'No menu found for that date.';
    replySender(reply);
  });
}

function replySender(reply) {
  sendMessage(senderID, {text: reply}).then(() => {
    console.log("Message sent!");
  }).catch((err) => {
    console.log("Message error");
  });
}

export default function processMessage(event) {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
      if (message.text == "dino" || message.text == "Dino") {
        let days = getDaysFromDate(new Date());

        let time = date.getHours() * 100 + date.getMinutes();

        dinoReplyHandler(days, time, "");

      } else if (message.text.startsWith("dino") || message.text.startsWith("Dino")) {

        // Get date as second part of message text
        let date = message.text.split(" ")[1];
        // Convert date from DD/MM/YYYY to MM/DD/YYYY
        date = date.split("/")[1] + "/" + date.split("/")[0] + "/" + date.split("/")[2];

        let days = getDaysFromDate(new Date(date));

        // Get breakfast, brunch, lunch or dinner option as third part of message text
        let option = message.text.split(" ")[2];

        dinoReplyHandler(days, 0, option);
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