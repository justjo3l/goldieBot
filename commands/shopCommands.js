// FILE TO HANDLE SHOP COMMANDS

import shop from './shop_commands/shop.js';

// Function to handle shop commands
export default function shopTypeHandler(command, senderID) {
  command = String(command);
  command = command.toLowerCase();
  if (command == "shop") {
    // If user sends shop, send shop items
    shop(senderID);

  }
}