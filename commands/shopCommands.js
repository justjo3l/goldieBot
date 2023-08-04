// FILE TO HANDLE SHOP COMMANDS

import shop from './shop_commands/shop.js';
import shopPage from './shop_commands/shopPage.js';
import shopStart from './shop_commands/shopStart.js';

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
    if (command.split(' ').length > 1 && !isNaN(command.split(' ')[1])) {
      shopPage(command, senderID);
    } else {
      // If user sends shop with an item name, send shop item info
      shopStart(command, senderID);
    }
  }
}
