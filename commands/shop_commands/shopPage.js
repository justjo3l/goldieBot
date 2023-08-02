// FILE TO HANDLE SHOP PAGE COMMAND

import shop from "./shop.js";

export default function shopPage(command, senderID) {

    // Get number of page as second argument of command
    let page = command.split(' ')[1];

    shop(senderID, page);
}