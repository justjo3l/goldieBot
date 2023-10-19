// FILE TO HANDLE ACTUAL MESSAGE SENDING PROCESS

import axios from 'axios';
import error from '../commands/error_commands/error';

/**
 * Function to handle message sending process
 * @param {*} recipientId
 * @param {*} message
 * @return {Promise} promise to send a message to the sender
 */
export default function sendMessage(recipientId, message) {
// Returns a promise to send a message to the sender
  return new Promise(function(resolve, reject) {
    axios.post('https://graph.facebook.com/v3.3/me/messages', {
      recipient: {id: recipientId},
      message: message,
    }, {
      params: {
        access_token: process.env.PAGE_ACCESS_TOKEN
      },
    }).then(response => {
      // Logs success message if message is sent
      console.log('Message sent to ' + recipientId);
    }).catch(error => {
      // Logs error message if message sending fails
      console.log('Error sending message: ' + error);
    });
  });
}
