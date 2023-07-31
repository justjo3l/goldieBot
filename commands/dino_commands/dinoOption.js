// FILE TO HANDLE DINO COMMAND WITH DATE AND OPTION

import { getDaysFromDate } from "../../util/helper.js";
import { dinoReplyHandler } from "../dinoCommands.js";

export default function dinoOption(option, senderID) {
    let returnedDetails = getDaysFromDate(new Date());
    let days = returnedDetails[0];
    let time = -1;

    dinoReplyHandler(days, time, option, senderID);
}