// FILE TO HANDLE DINO TIMINGS COMMAND

import {replySender} from '../../processes/message.js';
import { getDayFromDate } from '../../util/helper.js';

/**
 * Function to handle the dino timings command
 * @param {*} command
 * @param {*} senderID
 */
export default function dinoTimings(command, senderID) {
  let breakfast = "Breakfast: 7:30AM - 10:00AM\n";
  let brunch = "Brunch: 10:00AM - 12:00PM\n"
  let lunch = "Lunch: 12:00PM - 2:15PM\n";
  let dinner = "Dinner: 5:00PM - 7:30PM\n";

  let timings = breakfast;

  let day = getDayFromDate(new Date());

  if ([0,6].includes(day)) {
    timings += brunch;
  }

  timings += lunch + dinner;

  // If user sends the dino timings command, send the dino timings based on day
  let reply = timings;

  // Sends reply to user
  replySender(reply, senderID);
}
