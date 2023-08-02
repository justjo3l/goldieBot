// FILE TO HANDLE DINO COMMAND WITH OPTION

import {getDaysFromDate} from '../../util/helper.js';
import {dinoReplyHandler} from '../dinoCommands.js';

/**
 * Function to handle the dino command with option
 * @param {*} option
 * @param {*} senderID
 */
export default function dinoOption(option, senderID) {
  const returnedDetails = getDaysFromDate(new Date());
  const days = returnedDetails[0];
  const time = -1;

  dinoReplyHandler(days, time, option, senderID);
}
