import { Client, Environment, ApiError } from 'square';

const devClient = new Client({
    accessToken: "EAAAEBh5D-fZBbuUda4uveIuoWEcXaYFnywMSlTreBqBr98PB0F-f-reh-I3OFvI",
    environment: Environment.Sandbox,
});

const prodClient = new Client({
    accessToken: "EAAAF5zl3P5JyVuIfGF6r1r2qZdP0TdDdKGFyGxDNGtTR5fUgP0_gtFtqwcs7Yyw",
    environment: Environment.Production,
});

export default function getItems(dev=false) {
    return new Promise((resolve, reject) => {
        let client;
        if (dev) {
            client = devClient;
        } else {
            client = prodClient;
        }
        client.catalogApi.listCatalog(undefined, 'item').then((response) => {
            // Returns all objects in response body
            let objects = JSON.parse(response.body).objects;
            resolve(objects);
        }).catch((error) => {
            reject(error);
        });
    });
}