var fs = require('fs');
var shop_items = JSON.parse(fs.readFileSync('src/data/shop_items.json', 'utf8'));
var shop_prices = JSON.parse(fs.readFileSync('src/data/shop_prices.json', 'utf8'));

var shop_items_array = [];
var shop_prices_array = [];

for (var i in shop_items) {
    shop_items_array.push([i, shop_items[i]]);
}
for (var i in shop_prices) {
    shop_prices_array.push([i, shop_prices[i]]);
}
console.log(shop_items_array);
console.log(shop_prices_array);

module.exports = {
    shop_items: shop_items_array,
    shop_prices: shop_prices_array
};