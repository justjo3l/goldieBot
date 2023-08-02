// FILE TO HANDLE SHOP COMMAND

import { replySender } from "../../processes/message.js";
import { getItemBasedOnText } from "../../routes/square.js";

export default function shopStart(command, senderID) {

    let reply = "";
    let itemName = command.substring(5).trim();

    let printIndex = 1;

    getItemBasedOnText(itemName).then((items) => {
        reply = "'" + itemName + "' in Shop:\n\n";

        items.forEach((item) => {
            let location_overrides = item.item_data.variations[0].item_variation_data.location_overrides;
            if (location_overrides) {
                let itemName = item.item_data.name;
                let itemPrice = String(item.item_data.variations[0].item_variation_data.price_money.amount);
                itemPrice = itemPrice.slice(0, (itemPrice.length - 2)) + "." + itemPrice.slice((itemPrice.length - 2));
                if (itemPrice[0] == ".") {
                    itemPrice = "0" + itemPrice;
                }
                reply += itemName + " - $" + itemPrice + "\n";
                let isSoldOut = location_overrides[0].sold_out;
                if (isSoldOut && isSoldOut == true) {
                    reply += "This item is currently sold out.\n";
                }
                reply += "\n"
                printIndex += 1;
                if (printIndex % 10 == 0) {
                    replySender(reply, senderID);
                    reply = "";
                }
            }
        });
    
        if (reply != "") {
            replySender(reply, senderID);
        }

    }).catch((err) => {
        console.log(err);
        reply = "There was an error getting the shop items. Please try again later.";
        replySender(reply, senderID);
    });
}