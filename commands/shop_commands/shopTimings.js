// FILE TO HANDLE SHOP TIMINGS COMMAND

import {replySender} from '../../processes/message.js';

/**
 * Function to handle the shop timings command
 * @param {*} command
 * @param {*} senderID
 */
export default function shopTimings(command, senderID) {
  // If user sends the shop timings command, send the fixed shop timings
  let reply = 'Shop is open from 8PM to 11PM everyday!';

  // Sends reply to user
  replySender(reply, senderID);
}
