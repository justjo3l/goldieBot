// FILE TO HANDLE DINO COMMAND

import {getDaysFromDate} from '../../util/helper.js';
import {dinoReplyHandler} from '../dinoCommands.js';

/**
 * Function to handle the dino command
 * @param {*} senderID
 */
export default function dino(senderID) {
  const returnedDetails = getDaysFromDate(new Date());
  const days = returnedDetails[0];
  const time = returnedDetails[1];
  const option = '';

  dinoReplyHandler(days, time, option, senderID);
}
