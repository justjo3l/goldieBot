import request from 'request';
import sendMessage from '../templates/sendMessage.js';
import { getDinoMenu } from '../database.js';

function replaceNewLine(str) {
  return str.trim().replace(/\\n/g, "\n\n");
}

export default function processMessage(event) {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
      if (message.text == "dino" || message.text == "Dino") {
        let date = new Date(new Date() + new Date().getTimezoneOffset() * 60 * 1000);
        let compareDate = new Date(new Date("05/29/2023") + new Date().getTimezoneOffset() * 60 * 1000);
        console.log("Date 1: " + date);
        console.log("Date 2: " + compareDate);
        // Calculate the difference between the current date and 29/05/2023
        let days = Math.floor((date - compareDate) / (1000 * 60 * 60 * 24));
        console.log("Days: " + days);
        days =  days % 21;
        console.log("Days: " + days);
        let reply = '';

        console.log("Hours: ", date.getHours());
        console.log("Minutes: ", date.getMinutes());
        let time = date.getHours() * 100 + date.getMinutes();

        console.log(time);

        getDinoMenu(days).then((menu) => {
          if (menu != null) {
            if (time > 0 && time <= 1000) {
              reply = "BREAKFAST:\n\n"
              reply += replaceNewLine(menu.breakfast);
            } else if (time < 1200 && menu.brunch != "") {
              reply = "BRUNCH:\n\n"
              reply += replaceNewLine(menu.brunch);
            } else if (time <= 1415) {
              reply = "LUNCH:\n\n"
              reply += replaceNewLine(menu.lunch);
            } else {
              reply = "DINNER:\n\n"
              reply += replaceNewLine(menu.dinner) + "\n\nDESSERT:\n\n";
              reply += replaceNewLine(menu.dessert);
            }
          }
          sendMessage(senderID, {text: reply}).then(() => {
            console.log("Dino Message sent!");
          }).catch((err) => {
            console.log("Dino Message error");
          });
        }).catch((err) => {
          reply = 'No menu found for that date.'
          sendMessage(senderID, {text: reply}).then(() => {
            console.log("Dino Error Message sent!");
          }).catch((err) => {
            console.log("Dino Error Message error");
          });
        });
      } else if (message.text.startsWith("dino") || message.text.startsWith("Dino")) {

        // Get date as second part of message text
        let date = message.text.split(" ")[1];
        // Convert date from DD/MM/YYYY to MM/DD/YYYY
        date = date.split("/")[1] + "/" + date.split("/")[0] + "/" + date.split("/")[2];
        // Get number of days since 29/05/2023
        let days = Math.floor((new Date(date) - new Date("05/29/2023")) / (1000 * 60 * 60 * 24));
        days =  days % 21;
        let reply = ''

        // Get breakfast, brunch, lunch or dinner option as third part of message text
        let option = message.text.split(" ")[2];

        getDinoMenu(days).then((menu) => {
          if (menu != null) {
            if (option == "breakfast" || option == "Breakfast") {
              reply = "BREAKFAST:\n\n"
              reply += replaceNewLine(menu.breakfast);
            } else if (option == "brunch" || option == "Brunch") {
              reply = "BRUNCH:\n\n"
              reply += replaceNewLine(menu.brunch);
              if (menu.brunch == "") {
                reply = "No brunch on this day."
              }
            } else if (option == "lunch" || option == "Lunch") {
              reply = "LUNCH:\n\n"
              reply += replaceNewLine(menu.lunch);
            } else if (option == "dinner" || option == "Dinner") {
              reply = "DINNER:\n\n"
              reply += replaceNewLine(menu.dinner) + "\n\nDESSERT:\n\n";
              reply += replaceNewLine(menu.dessert);
            } else {
              reply = "Please specify breakfast, brunch, lunch or dinner."
            }
          }
          sendMessage(senderID, {text: reply}).then(() => {
            console.log("Dino Message sent!");
          }).catch((err) => {
            console.log("Dino Message error");
          });
        }).catch((err) => {
          reply = 'No menu found for that date.'
          sendMessage(senderID, {text: reply}).then(() => {
            console.log("Dino Error Message sent!");
          }).catch((err) => {
            console.log("Dino Error Message error");
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