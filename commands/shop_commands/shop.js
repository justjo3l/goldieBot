// FILE TO HANDLE SHOP COMMAND

import { replySender } from "../../processes/message.js";
import getItems from "../../routes/square.js";

export default function shop(senderID) {

    let reply = "";

    getItems().then((items) => {
        reply = "SHOP ITEMS:\n\n";

        items.forEach((item, index) => {
            if (index < 30) {
                let location_overrides = item.item_data.variations[0].item_variation_data.location_overrides;
                if (location_overrides) {
                    let isSoldOut = location_overrides[0].is_sold_out;
                    if (isSoldOut) {
                    } else {
                        let itemName = item.item_data.name;
                        let itemPrice = String(item.item_data.variations[0].item_variation_data.price_money.amount);
                        itemPrice = itemPrice.slice(0, (itemPrice.length - 2)) + "." + itemPrice.slice((itemPrice.length - 2));
                        if (itemPrice[0] == ".") {
                            itemPrice = "0" + itemPrice;
                        }
                        console.log(itemName);
                        console.log(itemPrice);
                        reply += itemName + " - $" + itemPrice + "\n";
                    }
                }
            }
        });
    
        replySender(reply, senderID);
    }).catch((err) => {
        console.log(err);
        reply = "There was an error getting the shop items. Please try again later.";
        replySender(reply, senderID);
    });
}