// FILE TO HANDLE SHOP COMMANDS

import shop from './shop_commands/shop.js';
import shopPage from './shop_commands/shopPage.js';
import shopStart from './shop_commands/shopStart.js';
import shopTimings from './shop_commands/shopTimings.js';

/**
 * Function to handle shop commands
 * @param {*} command
 * @param {*} senderID
 */
export default function shopTypeHandler(command, senderID) {
  command = String(command);
  command = command.toLowerCase();
  if (command == 'shop') {
    // If user sends shop, send shop items
    shop(senderID);
  } else if (command.startsWith('shop')) {
    if (command.includes('timing')) {
      // If user sends shop timings, send shop timings
      shopTimings(command, senderID);
    } else if (command.split(' ').length > 1 && !isNaN(command.split(' ')[1])) {
      // If user sends shop with a page number, send shop items on that page
      shopPage(command, senderID);
    } else {
      // If user sends shop with an item name, send shop item info
      shopStart(command, senderID);
    }
  }
}
