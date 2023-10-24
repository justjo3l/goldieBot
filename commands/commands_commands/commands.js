// FILE TO HANDLE COMMANDS COMMAND

import {replySender} from '../../processes/message.js';

/**
 * Function to handle the commands command
 * @param {*} senderID
 */
export default function commands(senderID) {
  // If user sends a commands command, send the list of commands
  const reply = 'What is that?';

  const fr = new FileReader();

  fr.readAsText('../../README.md');
  console.log(fr.result);

  // Sends reply to user
  replySender(reply, senderID);
}
