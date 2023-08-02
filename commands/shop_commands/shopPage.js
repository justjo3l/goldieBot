// FILE TO HANDLE SHOP PAGE COMMAND

import shop from './shop.js';

/**
 * Function handle shop command based on page number
 * @param {*} command
 * @param {*} senderID
 */
export default function shopPage(command, senderID) {
  // Get number of page as second argument of command
  const page = command.split(' ')[1];

  shop(senderID, page);
}
