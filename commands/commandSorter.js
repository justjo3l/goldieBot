// FILE TO HANDLE COMMAND TYPE SORTING

/**
 * Function to handle command type sorting
 * @param {*} command
 * @return {string} command type
 */
export default function getCommandType(command) {
  command = String(command);
  command = command.toLowerCase();
  if (command.startsWith('dino')) {
    return 'dino';
  } else if (['breakfast', 'brunch', 'lunch', 'dinner'].includes(command)) {
    return 'dino';
  } else if (command.startsWith('shop')) {
    return 'shop';
  } else if (command.startsWith('command')) {
    return 'commands';
  } else {
    return 'unknown';
  }
}
