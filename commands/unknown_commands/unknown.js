import axios from 'axios';
import { replySender } from '../../processes/message.js';

/**
 * Function to handle the unknown command
 * @param {*} command
 * @param {*} senderID
 */
export default function unknown(command, senderID) {
  // If the user sends an unknown command, send a fixed reply
  let reply = '';

  // Sending a GET request to get the user's first name
  axios.get(`https://graph.facebook.com/v3.3/${senderID}`, {
    params: {
      access_token: process.env.PAGE_ACCESS_TOKEN,
      fields: 'first_name',
    }
  })
  .then(response => {
    const firstName = response.data.first_name;
    reply = `Hello ${firstName}! `;
    reply += `You said "${command}"!`;
    replySender(reply, senderID);
  })
  .catch(error => {
    console.error('Error getting user name: ', error);
    // Handle the error or provide a default reply if needed
  });
}
