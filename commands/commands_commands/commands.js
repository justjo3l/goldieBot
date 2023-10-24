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
			commands.push(data.match(/- #+ `[A-Za-z]+ [A-Za-z]+`\\n/i));
		}
  });

  // Sends reply to user
  replySender(reply, senderID);
}
