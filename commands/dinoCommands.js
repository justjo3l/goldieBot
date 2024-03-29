// FILE TO HANDLE DINO COMMANDS

import {getDinoMenu} from '../database.js';
import replaceNewLine from '../util/helper.js';
import {replySender} from '../processes/message.js';
import dino from './dino_commands/dino.js';
import dinoStart from './dino_commands/dinoStart.js';
import dinoOption from './dino_commands/dinoOption.js';
import dinoTimings from './dino_commands/dinoTimings.js';

/**
 * Function to handle dino commands
 * @param {*} command
 * @param {*} senderID
 */
export default function dinoTypeHandler(command, senderID) {
  command = String(command);
  command = command.toLowerCase();
  if (command == 'dino') {
    // If user sends dino, send dino menu
    dino(senderID);
  } else if (command.startsWith('dino')) {
    if (command.includes('timing')) {
      // If user sends dino timings, send dino timings
      dinoTimings(command, senderID);
    } else {
      // If user sends dino followed by a date and option,
      // send menu based on the date and option
      dinoStart(command, senderID);
    }
  } else if (['breakfast', 'brunch', 'lunch', 'dinner'].includes(command)) {
    // If user sends option, send menu based on the option
    dinoOption(command, senderID);
  }
}


/**
 * Function to handle dino menu replies
 * @param {*} days
 * @param {*} time
 * @param {*} option
 * @param {*} senderID
 */
export function dinoReplyHandler(days, time, option, senderID) {
  let reply = '';

  option = String(option);
  option = option.toLowerCase();
  // Gets dino menu based on the days
  getDinoMenu(days).then((menu) => {
    if (menu != null) {
      if (option == 'brunch' && menu.brunch == '') {
        // Sends empty brunch menu if option is brunch
        // and brunch menu is empty
        reply = 'BRUNCH:\n\n';
        reply += 'No brunch menu for today.';
      } else if (option == 'breakfast' || time > 0 && time <= 1000) {
        // Sends breakfast menu if option is breakfast
        // or if time is between 0000 and 1000
        reply = 'BREAKFAST:\n\n';
        reply += replaceNewLine(menu.breakfast);
      } else if ((option == 'brunch' || time > 1000 && time <= 1200) &&
        menu.brunch != '') {
        // Sends brunch menu if option is brunch
        // or if time is between 1000 and 1200 and brunch menu is not empty
        reply = 'BRUNCH:\n\n';
        reply += replaceNewLine(menu.brunch);
      } else if (option == 'lunch' || time > 1200 && time <= 1415) {
        // Sends lunch menu if option is lunch
        // or if time is between 1200 and 1415
        reply = 'LUNCH:\n\n';
        reply += replaceNewLine(menu.lunch);
      } else {
        // Sends dinner and dessert menu if option is anything else
        // or if time is between 1415 and 2359
        reply = 'DINNER:\n\n';
        reply += replaceNewLine(menu.dinner);
        reply += '\n\nDESSERT:\n\n';
        reply += replaceNewLine(menu.dessert);
      }

      // Sends reply to user
      replySender(reply, senderID);
    }
  }).catch((err) => {
    // Handles error case when no menu was found for date
    // which should ideally never be a case :)
    reply = 'No menu found for that date.';

    // Sends reply to user
    replySender(reply, senderID);
  });
}
