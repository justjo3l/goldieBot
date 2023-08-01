// FILE TO HANDLE SHOP COMMAND

import { replySender } from "../../processes/message.js";
import getItems from "../../routes/square.js";

export default function shop(senderID) {

    let items = getItems();
    let reply = "SHOP ITEMS:\n\n";

    items.forEach((item) => {
        reply += item.name + " - $" + item.price + "\n";
    });

    replySender(reply, senderID);
}