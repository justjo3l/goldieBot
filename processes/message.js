// FILE TO HANDLE MESSAGE PROCESSING

import sendMessage from '../templates/sendMessage.js';
import getCommandType from '../commands/commandSorter.js';
import dinoTypeHandler from '../commands/dinoCommands.js';
import unknown from '../commands/unknown_commands/unknown.js';

// Function to send a message to the sender
export function replySender(reply, senderID) {
  sendMessage(senderID, {text: reply}).then(() => {

    // Logs success case if message is sent
    console.log("Message sent!");
  }).catch((err) => {

    // Logs error case if message sending fails
    console.log("Message error");
  });
}

// Function to handle message sending
export default function processMessage(event) {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(message));

    if (message.text) {
      if (getCommandType(message.text) == "dino") {
        // If user sends a dino command, send dino menu
        dinoTypeHandler(message.text, senderID);

      } else if (getCommandType(message.text) == "unknown") {
        // If user sends an unknown command, send a fixed reply
        unknown(message.text, senderID);

      }
    }
  }
}