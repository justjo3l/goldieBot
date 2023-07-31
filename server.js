// FILE TO RUN MAIN SERVER APPLICATION
// THIS IS THE MAIN GATEWAY TO THE APPLICATION

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import webhookVerify from './routes/webhook_verify.js';

// Create express app
const app = express();

// Configures app with port
app.set('port', (process.env.PORT || 3000));

// Sets up application middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Handles webhook verification through routes
webhookVerify(app);

// Starts active server to listen for updates/requests
app.listen(app.get('port'), function() {
  console.log('Application running on port: ', app.get('port'));
});