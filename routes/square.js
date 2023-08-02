import {Client, Environment} from 'square';

const devClient = new Client({
  accessToken: process.env.SQUARE_DEV_TOKEN,
  environment: Environment.Sandbox,
});

const prodClient = new Client({
  accessToken: process.env.SQUARE_PROD_TOKEN,
  environment: Environment.Production,
});

/**
 * Function to set client based on dev option
 * @param {*} dev
 * @return {Client} client
 */
function setEnvironment(dev=false) {
  let client;
  if (dev) {
    client = devClient;
  } else {
    client = prodClient;
  }

  return client;
}

/**
 * Function to get all items from Square
 * @param {*} dev
 * @return {Promise} promise to return all items
 */
export default function getItems(dev=false) {
  return new Promise((resolve, reject) => {
    const client = setEnvironment(dev);
    client.catalogApi.listCatalog(undefined, 'item').then((response) => {
      // Returns all objects in response body
      const objects = JSON.parse(response.body).objects;
      resolve(objects);
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * Function to get all items based on param text
 * @param {*} par
 * @param {*} dev
 * @return {Promise} promise to return item based on text
 */
export function getItemBasedOnText(par, dev=false) {
  return new Promise((resolve, reject) => {
    const client = setEnvironment(dev);
    client.catalogApi.searchCatalogItems({textFilter: par}).then((response) => {
      // Returns all items in response body
      const items = JSON.parse(response.body).items;
      resolve(items);
    }).catch((error) => {
      reject(error);
    });
  });
}
