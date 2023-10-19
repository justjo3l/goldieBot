// FILE TO HANDLE UNKNOWN COMMAND

import axios from 'axios';
import {replySender} from '../../processes/message.js';

/**
 * Function to handle the unknown command
 * @param {*} command
 * @param {*} senderID
 */
export default function unknown(command, senderID) {
  // If user sends an unknown command, send a fixed reply
  let reply = '';

  // Sending a GET request to get user's first name
  axios.get('https://graph.facebook.com/v3.3/' + senderID, {
    access_token: process.env.PAGE_ACCESS_TOKEN,
    fields: 'first_name',
  }, function(error, response, body) {
    if (error) {
      // Logs error if user name is not found
      console.error('Error getting user name: ' + error);
    } else {
      // Creates reply with user's first name
      const bodyObject = JSON.parse(body);
      console.log(bodyObject);
      const firstName = bodyObject.first_name;
      reply = 'Hello ' + firstName + '! ';
    }

    // Adds user's message to reply
    reply += 'You said "' + command + '"!';

    // Sends reply to user
    replySender(reply, senderID);
  });
}
