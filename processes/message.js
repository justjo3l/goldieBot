const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
      const message = event.message;
      const senderID = event.sender.id;
      console.log("Received message from senderId: " + senderID);
      console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
    // now we will take the text received and send it to an food tracking API.
      console.log("Text received!")
      let text = message.text;
      senderAction(senderID);
      sendMessage(senderID, {text: text}).then(() => {
        console.log("Message sent!");
     });
    }
  }
}