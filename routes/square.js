import { Client, Environment, ApiError } from 'square';

const client = new Client({
    accessToken: "EAAAEBh5D-fZBbuUda4uveIuoWEcXaYFnywMSlTreBqBr98PB0F-f-reh-I3OFvI",
    environment: Environment.Sandbox,
});

export default function getItems() {
    return newPromise((resolve, reject) => {
        client.catalogApi.listCatalog(undefined, 'item').then((response) => {
            // Returns all objects in response body
            let objects = JSON.parse(response.body).objects;
            resolve(objects);
        }).catch((error) => {
            reject(error);
        });
    });
}