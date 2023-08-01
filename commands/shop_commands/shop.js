// FILE TO HANDLE SHOP COMMAND

import { replySender } from "../../processes/message.js";
import getItems from "../../routes/square.js";

export default function shop(senderID) {

    let reply = "";

    getItems(true).then((items) => {
        reply = "SHOP ITEMS:\n\n";

        items.forEach((item) => {
            let itemName = item.item_data.name;
            let itemPrice = String(item.item_data.variations[0].item_variation_data.price_money.amount);
            itemPrice = itemPrice.slice(0, 1) + "." + itemPrice.slice(1);
            console.log(itemName);
            console.log(itemPrice);
            reply += itemName + " - $" + itemPrice + "\n";
        });
    
        replySender(reply, senderID);
    }).catch((err) => {
        reply = "There was an error getting the shop items. Please try again later.";
        replySender(reply, senderID);
    });
}