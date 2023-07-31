// FILE TO HANDLE DINO COMMANDS

import { getDinoMenu } from '../database.js';
import replaceNewLine from '../util/helper.js';
import { replySender } from '../processes/message.js';
import dino from './dino_commands/dino.js';
import dinoStart from './dino_commands/dinoStart.js';
import dinoOption from './dino_commands/dinoOption.js';

// Function to handle dino commands
export default function dinoTypeHandler(command, senderID) {
  command = command.toLowerCase();
  if (command == "dino") {
    // If user sends dino, send dino menu
    dino(senderID);

  } else if (command.startsWith("dino")) {
    // If user sends dino followed by a date and option, send menu based on the date and option
    dinoStart(command, senderID);

  } else if (command in ["breakfast", "brunch", "lunch", "dinner"]) {
    // If user sends option, send menu based on the option
    dinoOption(command, senderID);

  }
}


// Function to handle dino menu replies
export function dinoReplyHandler(days, time, option, senderID) {
    let reply = '';
  
    // Gets dino menu based on the days
    getDinoMenu(days).then((menu) => {
      if (menu != null) {
        if (option == "brunch" && menu.brunch == "") {
          // Sends empty brunch menu if option is brunch and brunch menu is empty
          reply = "BRUNCH:\n\n";
          reply += "No brunch menu for today.";

        } else if (option == "breakfast" || option == "Breakfast" || time > 0 && time <= 1000) {
          // Sends breakfast menu if option is breakfast or if time is between 0000 and 1000
          reply = "BREAKFAST:\n\n";
          reply += replaceNewLine(menu.breakfast);

        } else if (option == "brunch" || option == "Brunch" || time > 1000 && time <= 1200 && menu.brunch != "") {
          // Sends brunch menu if option is brunch or if time is between 1000 and 1200 and brunch menu is not empty
          reply = "BRUNCH:\n\n";
          reply += replaceNewLine(menu.brunch);

        } else if (option == "lunch" || option == "Lunch" || time > 1200 && time <= 1415) {
          // Sends lunch menu if option is lunch or if time is between 1200 and 1415
          reply = "LUNCH:\n\n";
          reply += replaceNewLine(menu.lunch);

        } else {
          // Sends dinner and dessert menu if option is anything else or if time is between 1415 and 2359
          reply = "DINNER:\n\n";
          reply += replaceNewLine(menu.dinner);
          reply += "\n\nDESSERT:\n\n";
          reply += replaceNewLine(menu.dessert);

        }
  
        // Sends reply to user
        replySender(reply, senderID);
      }
    }).catch((err) => {
      // Handles error case when no menu was found for date, which should ideally never be a case :)
      reply = 'No menu found for that date.';
  
      // Sends reply to user
      replySender(reply, senderID);
    });
  }