// FILE TO HANDLE ERROR COMMAND

import { replySender } from '../../processes/message.js';

export default function error(senderID) {
    // If user sends an error command, send a fixed reply
    let reply = 'What is that?';

    // Sends reply to user
    replySender(reply, senderID);
}