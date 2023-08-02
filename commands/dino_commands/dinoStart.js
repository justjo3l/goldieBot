// FILE TO HANDLE DINO COMMAND WITH DATE AND OPTION

import {getDaysFromDate} from '../../util/helper.js';
import {dinoReplyHandler} from '../dinoCommands.js';

/**
 * Function to handle the dino command with date and option
 * @param {*} command
 * @param {*} senderID
 */
export default function dinoStart(command, senderID) {
  const time = -1;

  // If user sends "dino" or "Dino" with a date and option,
  // send menu for that date and option
  // Get date as second part of message text
  let date = command.split(' ')[1];

  const DD = date.split('/')[0];
  const MM = date.split('/')[1];
  const YYYY = date.split('/')[2];

  // Convert date from DD/MM/YYYY to MM/DD/YYYY
  date = MM + '/' + DD + '/' + YYYY;

  // Get days from 29/05/2023
  const days = getDaysFromDate(new Date(date))[0];

  // Get breakfast, brunch, lunch or dinner option as third part of message text
  const option = command.split(' ')[2];

  dinoReplyHandler(days, time, option, senderID);
}
