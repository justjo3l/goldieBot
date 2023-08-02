// FILE TO VERIFY META WEBHOOK

import processPostback from '../processes/postback.js';
import processMessage from '../processes/message.js';

/**
 * Function to verify webhook
 * @param {*} app
 * @param {*} chalk
 */
export default function webhookVerify(app, chalk) {
  // Handles get routes for '/webhook'. This is used to verify the webhook
  app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
      // Webhook successfully verified
      console.log('webhook verified');
      res.status(200).send(req.query['hub.challenge']);
    } else {
      // Webhook verification failed
      console.error('verification failed. Token mismatch.');
      res.sendStatus(403);
    }
  });

  // Handles post routes for '/webhook'. This is used to receive messages
  app.post('/webhook', function(req, res) {
    // Checks for page subscription
    if (req.body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      req.body.entry.forEach(function(entry) {
        // Iterate over each messaging event
        entry.messaging.forEach(function(event) {
          if (event.postback) {
            // If the event is a postback, process it
            processPostback(event);
          } else if (event.message) {
            // If the event is a message, process it
            processMessage(event);
          }
        });
      });
      res.sendStatus(200);
    }
  });
}
