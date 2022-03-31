import numpy as np
import pandas as pd
import json
from json import JSONEncoder

class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)

shop_list = pd.read_csv('src/data/shop_list_csv.csv')

shop_list = shop_list.dropna()

shop_list = shop_list.drop(columns=['Index'])

shop_items = shop_list['Item']

shop_items_array = shop_items.to_numpy()

shop_prices = shop_list['Price']

shop_prices_array = shop_prices.to_numpy()

with open('src/data/shop_items.json', 'w') as f:
    json.dump(shop_items_array, f, cls=NumpyArrayEncoder)

with open('src/data/shop_prices.json', 'w') as f:
    json.dump(shop_prices_array, f, cls=NumpyArrayEncoder)

print(shop_list)
