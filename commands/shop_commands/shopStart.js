// FILE TO HANDLE SHOP START COMMAND

import {replySender} from '../../processes/message.js';
import {getItemBasedOnText} from '../../routes/square.js';

/**
 * Function to handle shop command based on text
 * @param {*} command
 * @param {*} senderID
 */
export default function shopStart(command, senderID) {
  let reply = '';
  const itemName = command.substring(5).trim();

  let printIndex = 1;

  getItemBasedOnText(itemName).then((items) => {
    reply = '\'' + itemName + '\' in Shop:\n\n';

    items.forEach((item) => {
      const itemData = item.item_data;
      const itemVariationData = itemData.variations[0].item_variation_data;
      const locationOverrides = itemVariationData.location_overrides;
      if (locationOverrides) {
        const itemName = item.item_data.name;
        let itemPrice = String(itemVariationData.price_money.amount);
        itemPrice = itemPrice.slice(0, (itemPrice.length - 2)) + '.' + itemPrice.slice((itemPrice.length - 2));
        if (itemPrice[0] == '.') {
          itemPrice = '0' + itemPrice;
        }
        reply += itemName + ' - $' + itemPrice + '\n';
        const isSoldOut = locationOverrides[0].sold_out;
        if (isSoldOut && isSoldOut == true) {
          reply += 'This item is currently sold out.\n';
        }
        reply += '\n';
        printIndex += 1;
        if (printIndex != 1 && printIndex - 1 % 10 == 0) {
          replySender(reply, senderID);
          reply = '';
        }
      }
    });

    if (reply != '') {
      replySender(reply, senderID);
    }
  }).catch((err) => {
    console.log(err);
    reply = 'There was an error getting shop items. Please try again later.';
    replySender(reply, senderID);
  });
}
