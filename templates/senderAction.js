// FILE TO HANDLE SENDER ACTION
// NOT PROPERLY IMPLEMENTED YET

import axios from 'axios';

/**
 * Function to handle sender action
 * @param {*} recipientId
 */
export default function senderAction(recipientId) {
  axios.post('https://graph.facebook.com/v3.3/me/messages', {
    recipient: {id: recipientId},
    message: message,
  }, {
    params: {access_token: process.env.PAGE_ACCESS_TOKEN},
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ' + response.error);
    }
  });
}
