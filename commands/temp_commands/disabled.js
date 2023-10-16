// FILE TO HANDLE DISABLED COMMAND

import {replySender} from '../../processes/message.js';

/**
 * Function to handle a disabled command
 * @param {*} command
 * @param {*} senderID
 */
export default function disabled(command, senderID) {
  // If user sends a disabled command, send a fixed reply
  let reply = 'This command has been disabled temporarily. Sorry for the inconvenience!';

  // Sends reply to user
  replySender(reply, senderID);
}
