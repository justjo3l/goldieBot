// FILE TO HANDLE COMMANDS COMMAND

import {replySender} from '../../processes/message.js';
import * as fs from 'fs';
import { getCommandHelps, getCommands } from '../../util/helper.js';

/**
 * Function to handle the commands command
 * @param {*} senderID
 */
export default function commands(senderID) {
  // If user sends a commands command, send the list of commands
  let reply = '';

	let commands = [];
	let commandHelps = [];

  // Read README.md file
  fs.readFile('README.md', 'utf8', (err, data) => {
		if (err) {
			// Logs error if file reading fails
			console.log(err);
			reply = 'Error getting commands.';
		} else {
			// Logs data
			commands = getCommands(data);
			commandHelps = getCommandHelps(data);
			reply = 'Here are the list of commands:\n\n';
			for (let i = 0; i < commands.length; i++) {
				reply += commands[i] + '\n\n' + commandHelps[i] + '\n\n\n';
			}
			console.log(reply);
		}
  });

  // Sends reply to user
  replySender(reply, senderID);
}
