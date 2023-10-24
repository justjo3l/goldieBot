// FILE TO HANDLE COMMANDS COMMAND

import {replySender} from '../../processes/message.js';
import * as fs from 'fs';

/**
 * Function to handle the commands command
 * @param {*} senderID
 */
export default function commands(senderID) {
  // If user sends a commands command, send the list of commands
  const reply = 'Umm, commands :)';

	let commands = [];
	let commandHelps = [];

  // Read README.md file
  fs.readFile('README.md', 'utf8', (err, data) => {
		if (err) {
			// Logs error if file reading fails
			console.log(err);
		} else {
			// Logs data
			// Add all lines where the first character is a - and ends with a newline
			// to the commands array
			commands = data.match(/^-.*\n/gm);
			console.log(commands);
		}
  });

  // Sends reply to user
  replySender(reply, senderID);
}
