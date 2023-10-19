// FILE TO HANDLE SENDER ACTION
// NOT PROPERLY IMPLEMENTED YET

import axios from 'axios';

/**
 * Function to handle sender action
 * @param {*} recipientId
 */
export default function senderAction(recipientId) {
  axios.request({
    url: 'https://graph.facebook.com/v3.3/me/messages',
    params: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: 'POST',
    data: {
      json: {
        recipient: {id: recipientId},
        message: message,
      }
    },
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ' + response.error);
    }
  });
}
