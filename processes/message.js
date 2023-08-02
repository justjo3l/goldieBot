// FILE TO HANDLE MESSAGE PROCESSING

import sendMessage from '../templates/sendMessage.js';
import getCommandType from '../commands/commandSorter.js';
import dinoTypeHandler from '../commands/dinoCommands.js';
import shopTypeHandler from '../commands/shopCommands.js';
import unknown from '../commands/unknown_commands/unknown.js';
import error from '../commands/error_commands/error.js';

/**
 * Function to send a message to the sender
 * @param {*} reply
 * @param {*} senderID
 */
export function replySender(reply, senderID) {
  sendMessage(senderID, {text: reply}).then(() => {
    // Logs success case if message is sent
    console.log('Message sent!');
  }).catch((err) => {
    // Logs error case if message sending fails
    console.log('Message error');
  });
}

/**
 * Function to handle message sending
 * @param {*} event
 */
export default function processMessage(event) {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log('Received message from senderId: ' + senderID);
    console.log('Message is: ' + JSON.stringify(message));

    if (message.text) {
      const input = message.text.trim();
      if (input) {
        if (getCommandType(input) == 'dino') {
          // If user sends a dino command, send dino menu
          dinoTypeHandler(input, senderID);
        } else if (getCommandType(input) == 'shop') {
          // If user sends a shop command, send shop items
          shopTypeHandler(input, senderID);
        } else if (getCommandType(input) == 'unknown') {
          // If user sends an unknown command, send a fixed reply
          unknown(input, senderID);
        }
      }
    } else {
      // If user sends a non-text message, send a fixed reply
      error('What is that?', senderID);
    }
  }
}
