// FILE TO HANDLE UNKNOWN COMMAND

import request from 'request';
import { replySender } from '../../processes/message.js';

export default function unknown(command, senderID) {
    // If user sends an unknown command, send a fixed reply
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
      reply += "You said \"" + command + "\"!";

      // Sends reply to user
      replySender(reply, senderID);
    });
}