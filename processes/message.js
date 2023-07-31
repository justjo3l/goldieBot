// FILE TO HANDLE MESSAGE PROCESSING

import request from 'request';
import sendMessage from '../templates/sendMessage.js';
import { getDinoMenu } from '../database.js';
import replaceNewLine, { getDaysFromDate } from '../util/helper.js';

// Function to handle dino menu replies
function dinoReplyHandler(days, time, option, senderID) {
  let reply = '';

  // Gets dino menu based on the days
  getDinoMenu(days).then((menu) => {
    if (menu != null) {
      if (option == "brunch" && menu.brunch == "") {
        // Sends empty brunch menu if option is brunch and brunch menu is empty
        reply = "BRUNCH:\n\n";
        reply += "No brunch menu for today.";
      } else if (option == "breakfast" || option == "Breakfast" || time > 0 && time <= 1000) {
        // Sends breakfast menu if option is breakfast or if time is between 0000 and 1000
        reply = "BREAKFAST:\n\n";
        reply += replaceNewLine(menu.breakfast);
      } else if (option == "brunch" || option == "Brunch" || time > 1000 && time <= 1200 && menu.brunch != "") {
        // Sends brunch menu if option is brunch or if time is between 1000 and 1200 and brunch menu is not empty
        reply = "BRUNCH:\n\n";
        reply += replaceNewLine(menu.brunch);
      } else if (option == "lunch" || option == "Lunch" || time > 1200 && time <= 1415) {
        // Sends lunch menu if option is lunch or if time is between 1200 and 1415
        reply = "LUNCH:\n\n";
        reply += replaceNewLine(menu.lunch);
      } else {
        // Sends dinner and dessert menu if option is anything else or if time is between 1415 and 2359
        reply = "DINNER:\n\n";
        reply += replaceNewLine(menu.dinner);
        reply += "\n\nDESSERT:\n\n";
        reply += replaceNewLine(menu.dessert);
      }

      // Sends reply to user
      replySender(reply, senderID);
    }
  }).catch((err) => {
    // Handles error case when no menu was found for date, which should ideally never be a case :)
    reply = 'No menu found for that date.';

    // Sends reply to user
    replySender(reply, senderID);
  });
}

// Function to send a message to the sender
function replySender(reply, senderID) {
  sendMessage(senderID, {text: reply}).then(() => {

    // Logs success case if message is sent
    console.log("Message sent!");
  }).catch((err) => {

    // Logs error case if message sending fails
    console.log("Message error");
  });
}

// Function to handle message sending
export default function processMessage(event) {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(message));
    if (message.text) {

      let returnedDetails = getDaysFromDate(new Date());
      let days = returnedDetails[0];

      let time = -1;

      let option = "";

      if (message.text == "dino" || message.text == "Dino") {

        time = returnedDetails[1];

        // If user sends "dino" or "Dino", send menu for today at nearest time
        dinoReplyHandler(days, time, option, senderID);

      } else if (message.text.startsWith("dino") || message.text.startsWith("Dino")) {
        // If user sends "dino" or "Dino" with a date and option, send menu for that date and option

        // Get date as second part of message text
        let date = message.text.split(" ")[1];

        // Convert date from DD/MM/YYYY to MM/DD/YYYY
        date = date.split("/")[1] + "/" + date.split("/")[0] + "/" + date.split("/")[2];

        // Get days from 29/05/2023
        days = getDaysFromDate(new Date(date))[0];

        // Get breakfast, brunch, lunch or dinner option as third part of message text
        option = message.text.split(" ")[2];

        dinoReplyHandler(days, time, option, senderID);

      } else if (message.text == "breakfast" || message.text == "Breakfast") {
        // If user sends "breakfast" or "Breakfast", send breakfast menu for today

        dinoReplyHandler(days, time, "breakfast", senderID);

      } else if (message.text == "brunch" || message.text == "Brunch") {
        // If user sends "brunch" or "Brunch", send brunch menu for today

        dinoReplyHandler(days, time, "brunch", senderID);

      } else if (message.text == "lunch" || message.text == "Lunch") {
        // If user sends "lunch" or "Lunch", send lunch menu for today

        dinoReplyHandler(days, time, "lunch", senderID);

      } else if (message.text == "dinner" || message.text == "Dinner") {
        // If user sends "dinner" or "Dinner", send dinner and dessert menu for today

        dinoReplyHandler(days, time, "dinner", senderID);

      } else {
        // If user sends anything else, send a fixed reply
        let reply = '';

        // Sending a GET request to get user's first name
        request({ url: "https://graph.facebook.com/v3.3/" + senderID,
            qs: { access_token: process.env.PAGE_ACCESS_TOKEN,
                  fields: "first_name"
                },
            method: "GET"
          }, function(error, response, body) {
          if (error) {
            // Logs error if user name is not found
            console.error("Error getting user name: " + error);
          } else {
            // Creates reply with user's first name
            let bodyObject = JSON.parse(body);
            console.log(bodyObject);
            let first_name = bodyObject.first_name;
            reply = "Hello " + first_name + "! ";
          }

          // Adds user's message to reply
          reply += "You said \"" + message.text + "\"!";

          // Sends reply to user
          replySender(reply, senderID);
        });
      }
    }
  }
}