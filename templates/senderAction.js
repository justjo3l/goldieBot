// FILE TO HANDLE SENDER ACTION
// NOT PROPERLY IMPLEMENTED YET

import axios from 'axios';

/**
 * Function to handle sender action
 * @param {*} recipientId
 */
export default function senderAction(recipientId) {
  axios.post('https://graph.facebook.com/v3.3/me/messages',
    {
      'recipient': {id: recipientId},
      'sender_action': 'typing_on',
    }, {
      params: {
        access_token: process.env.PAGE_ACCESS_TOKEN
      }
    }).then(response => {
    console.log('Sender action sent to ' + recipientId);
  }).catch(error => {
    console.log('Error sending sender action: ' + error);
  });
}
