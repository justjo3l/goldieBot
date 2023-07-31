// FILE TO HANDLE DINO COMMAND

import { getDaysFromDate } from "../../util/helper.js";
import dinoReplyHandler from "../dinoCommands.js";

export default function dino(senderID) {
    let returnedDetails = getDaysFromDate(new Date());
    let days = returnedDetails[0];
    let time = returnedDetails[1];
    let option = "";

    dinoReplyHandler(days, time, option, senderID);
}