// FILE TO HANDLE POSTBACK PROCESSING
// NOT PROPERLY IMPLEMENTED YET

import axios from 'axios';
import sendMessage from '../templates/sendMessage.js';

/**
 * Function to handle postback processing
 * @param {*} event
 */
export default function processPostback(event) {
  const senderID = event.sender.id;
  const payload = event.postback.payload;
  if (payload === 'WELCOME') {
    axios.request({url: 'https://graph.facebook.com/v3.3/' + senderID,
      params: {access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: 'first_name',
      },
      method: 'GET',
    }, function(error, response, body) {
      let greeting = '';
      if (error) {
        console.error('Error getting user name: ' + error);
      } else {
        const bodyObject = JSON.parse(body);
        console.log(bodyObject);
        const firstName = bodyObject.first_name;
        greeting = 'Hello ' + firstName + '. ';
      }
      let message = greeting + 'Welcome to Healthbot. ';
      message += 'Hope you are doing good today!';
      sendMessage(senderID, {text: message}).then(() => {
        sendMessage(senderID, {text: '🎈'});
      });
    });
  }
}
