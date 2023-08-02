// FILE TO HANDLE SENDER ACTION
// NOT PROPERLY IMPLEMENTED YET

import request from 'request';

/**
 * Function to handle sender action
 * @param {*} recipientId
 */
export default function senderAction(recipientId) {
  request({
    url: 'https://graph.facebook.com/v3.3/me/messages',
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: 'POST',
    json: {
      'recipient': {id: recipientId},
      'sender_action': 'typing_on',
    },
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ' + response.error);
    }
  });
}
