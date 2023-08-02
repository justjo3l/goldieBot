// FILE TO HANDLE SHOP COMMANDS

import shop from './shop_commands/shop.js';
import shopStart from './shop_commands/shopStart.js';

// Function to handle shop commands
export default function shopTypeHandler(command, senderID) {
  command = String(command);
  command = command.toLowerCase();
  if (command == "shop") {
    // If user sends shop, send shop items
    shop(senderID);

  } else if (command.startsWith("shop")) {
    // If user sends shop with an item name, send shop item info
    shopStart(command, senderID);

  }
}