// FILE TO HANDLE SHOP COMMAND

import {replySender} from '../../processes/message.js';
import getItems from '../../routes/square.js';
import {ignoreCategories} from '../../data/shop_data.js';

/**
 * Function to handle the shop command
 * @param {*} senderID
 * @param {*} page
 */
export default function shop(senderID, page=0) {
  let reply = '';

  getItems().then((items) => {
    reply = 'SHOP ITEMS:\n\n';

    let index = 20 * page;

    items.forEach((item) => {
      if (index < 20 * (page + 1)) {
        const itemData = item.item_data;
        const itemVariationData = itemData.variations[0].item_variation_data;
        const locationOverrides = itemVariationData.location_overrides;
        const category = item.item_data.category_id;
        if (locationOverrides && !(ignoreCategories.includes(category))) {
          const isSoldOut = locationOverrides[0].sold_out;
          if (isSoldOut && isSoldOut == true) {
          } else {
            const itemName = item.item_data.name;
            let itemPrice = String(itemVariationData.price_money.amount);
            itemPrice = itemPrice.slice(0, (itemPrice.length - 2)) + '.' + itemPrice.slice((itemPrice.length - 2));
            if (itemPrice[0] == '.') {
              itemPrice = '0' + itemPrice;
            }
            reply += itemName + ' - $' + itemPrice + '\n';
            index += 1;
          }
        }
      }
    });
    replySender(reply, senderID);
  }).catch((err) => {
    console.log(err);
    reply = 'There was an error getting shop items. Please try again later.';
    replySender(reply, senderID);
  });
}
