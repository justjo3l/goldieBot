// FILE TO HANDLE SHOP COMMAND

import { replySender } from "../../processes/message.js";
import getItems from "../../routes/square.js";

const goldieMerchCode = "CM6H2S35JFUKXEZPW5SUFVVF";
const goldieEventCode = "5J4KVM73SLYED3XP5MS4PJRY";

export default function shop(senderID) {

    let reply = "";

    getItems().then((items) => {
        reply = "SHOP ITEMS:\n\n";

        let printIndex = 1;

        items.forEach((item, index) => {
            if (index != 0 && index % 20 != 0) {
                let location_overrides = item.item_data.variations[0].item_variation_data.location_overrides;
                let category = item.item_data.category_id;
                if (location_overrides && !([goldieMerchCode, goldieEventCode].includes(category))) {
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
                }
            } else {
                replySender(reply, senderID);
                reply = "";
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