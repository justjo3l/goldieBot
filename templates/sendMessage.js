// FILE TO HANDLE ACTUAL MESSAGE SENDING PROCESS

import axios from 'axios';

/**
 * Function to handle message sending process
 * @param {*} recipientId
 * @param {*} message
 * @return {Promise} promise to send a message to the sender
 */
export default function sendMessage(recipientId, message) {
// Returns a promise to send a message to the sender
  return new Promise(function(resolve, reject) {
    axios.post({
      url: 'https://graph.facebook.com/v3.3/me/messages',
      params: {access_token: process.env.PAGE_ACCESS_TOKEN},
      data: { json: {
          recipient: {id: recipientId},
          message: message,
        }
      },
    }, function(error, response, body) {
      if (error) {
        // Logs error and rejects promise if message sending fails
        console.log('Error sending message: ' + response.error);
        reject(response.error);
      } else {
        // Resolves promise if message is sent
        resolve(body);
      }
    });
  });
}
