// FILE TO HANDLE SHOP COMMAND

import { replySender } from "../../processes/message.js";
import getItems from "../../routes/square.js";

export default function shop(senderID) {

    let reply = "";

    getItems().then((items) => {
        reply = "SHOP ITEMS:\n\n";

        items.forEach((item) => {
            console.log(item);
            reply += item.name + " - $" + item.price + "\n";
        });
    
        replySender(reply, senderID);
    }).catch((err) => {
        reply = "There was an error getting the shop items. Please try again later.";
        replySender(reply, senderID);
    });
}