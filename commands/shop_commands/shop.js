// FILE TO HANDLE SHOP COMMAND

import { replySender } from "../../processes/message.js";
import getItems from "../../routes/square.js";
import { ignoreCategories } from "../../data/shop_data.js";
import { wait } from "../../util/helper.js";

export default function shop(senderID) {

    let reply = "";

    getItems().then((items) => {
        reply = "SHOP ITEMS:\n\n";

        let printIndex = 1;

        items.forEach((item) => {
            let location_overrides = item.item_data.variations[0].item_variation_data.location_overrides;
            let category = item.item_data.category_id;
            if (location_overrides && !(ignoreCategories.includes(category))) {
                let isSoldOut = location_overrides[0].sold_out;
                if (isSoldOut && isSoldOut == true) {
                } else {
                    let itemName = item.item_data.name;
                    let itemPrice = String(item.item_data.variations[0].item_variation_data.price_money.amount);
                    itemPrice = itemPrice.slice(0, (itemPrice.length - 2)) + "." + itemPrice.slice((itemPrice.length - 2));
                    if (itemPrice[0] == ".") {
                        itemPrice = "0" + itemPrice;
                    }
                    reply += printIndex + ". " + itemName + " - $" + itemPrice + "\n";
                    printIndex += 1;
                }
                if (printIndex % 10 == 0) {
                    replySender(reply, senderID);
                    wait(2000);
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