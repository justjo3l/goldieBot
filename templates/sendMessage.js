// FILE TO HANDLE ACTUAL MESSAGE SENDING PROCESS

import request from 'request';

/**
 * Function to handle message sending process
 * @param {*} recipientId
 * @param {*} message
 * @return {Promise} promise to send a message to the sender
 */
export default function sendMessage(recipientId, message) {
  // Returns a promise to send a message to the sender
  return axios.post('https://graph.facebook.com/v3.3/me/messages', {
      recipient: {id: recipientId},
      message: message,
    }, {
      params: {
        access_token: process.env.PAGE_ACCESS_TOKEN
      },
    }).then(response => {
      return response.data;
    }).catch(error => {
      console.error('Error sending message:', error.response.data);
      throw error.response.data;
    });
}
