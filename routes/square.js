import { Client, Environment, ApiError } from 'square';

const devClient = new Client({
    accessToken: "EAAAEBh5D-fZBbuUda4uveIuoWEcXaYFnywMSlTreBqBr98PB0F-f-reh-I3OFvI",
    environment: Environment.Sandbox,
});

const prodClient = new Client({
    accessToken: "EAAAF5zl3P5JyVuIfGF6r1r2qZdP0TdDdKGFyGxDNGtTR5fUgP0_gtFtqwcs7Yyw",
    environment: Environment.Production,
});

function setEnvironment(dev=false) {
    let client;
    if (dev) {
        client = devClient;
    } else {
        client = prodClient;
    }

    return client;
}

export default function getItems(dev=false) {
    return new Promise((resolve, reject) => {
        let client = setEnvironment(dev);
        client.catalogApi.listCatalog(undefined, 'item').then((response) => {
            // Returns all objects in response body
            let objects = JSON.parse(response.body).objects;
            resolve(objects);
            
        }).catch((error) => {
            reject(error);

        });
    });
}

export function getItemBasedOnText(param, dev=false) {
    return new Promise((resolve, reject) => {
        let client = setEnvironment(dev);
        client.catalogApi.searchCatalogItems({ textFilter: param }).then((response) => {
            // Returns all items in response body
            let items = JSON.parse(response.body).items;
            resolve(items);

        }).catch((error) => {
            reject(error);

        });
    });
}