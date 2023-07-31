// FILE TO HANDLE OPTION COMMAND

import { getDaysFromDate } from "../../util/helper.js";
import dinoReplyHandler from "../dinoCommands.js";

export default function dinoStart(command, senderID) {
    let time = -1;

    // If user sends "dino" or "Dino" with a date and option, send menu for that date and option
    // Get date as second part of message text
    let date = command.split(" ")[1];

    // Convert date from DD/MM/YYYY to MM/DD/YYYY
    date = date.split("/")[1] + "/" + date.split("/")[0] + "/" + date.split("/")[2];

    // Get days from 29/05/2023
    let days = getDaysFromDate(new Date(date))[0];

    // Get breakfast, brunch, lunch or dinner option as third part of message text
    let option = command.split(" ")[2];

    dinoReplyHandler(days, time, option, senderID);
}