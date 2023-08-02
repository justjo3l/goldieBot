// FILE TO HANDLE ERROR COMMAND

import {replySender} from '../../processes/message.js';

/**
 * Function to handle the error command
 * @param {*} senderID
 */
export default function error(senderID) {
  // If user sends an error command, send a fixed reply
  const reply = 'What is that?';

  // Sends reply to user
  replySender(reply, senderID);
}
