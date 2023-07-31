// FILE TO HANDLE ACTUAL MESSAGE SENDING PROCESS

import request from "request";
export default function sendMessage(recipientId, message) {

// Returns a promise to send a message to the sender
return new Promise(function(resolve, reject) {
   request({
      url: "https://graph.facebook.com/v3.3/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: {
              recipient: {id: recipientId},
              message: message,
            }
      }, function(error, response, body) {
            if (error) {
               // Logs error and rejects promise if message sending fails
               console.log("Error sending message: " + response.error);
               reject(response.error);
            } else {
               // Resolves promise if message is sent
               resolve(body);
            }
       });
   })
}