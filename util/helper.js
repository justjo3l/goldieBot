// FILE TO CONTAIN HELPER FUNCTIONS FOR THE BOT

/**
 * Function to replace the database weird \\n occurence with \n\n
 * @param {*} str
 * @return {String} modified string
 */
export default function replaceNewLine(str) {
  str = str.trim().replace(/\\n/g, '\n\n');
  return str;
}

/**
 * Function to calculate the days from a date based on timezone offset
 * @param {*} d
 * @param {*} offset
 * @return {Date} new date with offset
 */
export function calculateTime(d, offset) {
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  const nd = new Date(utc + (3600000*offset));

  return nd;
}

/**
 * Function to get the days from a date based on 21-day cycle
 * @param {*} date
 * @return {Array} array of days and time
 */
export function getDaysFromDate(date) {
  // Gets current time with 10-hour offset (GMT+10)
  date = calculateTime(new Date(date), 10);

  // Gets date of 29th May 2023 with 10-hour offset (GMT+10)
  const compareDate = calculateTime(new Date('05/29/2023'), 10);

  // Gets difference between days and gets remainder of 21-day cycle
  let days = Math.floor((date - compareDate) / (1000 * 60 * 60 * 24));
  days = days % 21;

  // Gets time for further message processing
  const time = date.getHours() * 100 + date.getMinutes();

  // Returns array of days and time
  return [days, time];
}


/**
 * Function to get the days from a date based on 21-day cycle
 * @param {*} date
 * @return {Array} array of days and time
 */
export function getDayFromDate(date) {
  // Gets current time with 10-hour offset (GMT+10)
  date = calculateTime(new Date(date), 10);

  // Gets time for further message processing
  const day = date.getDay()

  // Returns day
  return day
}

/**
 * Function to get commands from data
 * @param {*} data
 * @return {Array} array of commands
 */
export function getCommands(data) {
  let commands = [];

  // Gets all commands from data based on format.
  data.match(/^-.*\n/gm).forEach((line) => {
    commands.push(line.substring(
      line.indexOf("`") + 1, 
      line.lastIndexOf("`")
    ));
  });

  return commands;
}

/**
 * Function to get command helps from data
 * @param {*} data
 * @return {Array} array of command helps
 */
export function getCommandHelps(data) {
  let commandHelps = [];

  // Gets all command helps from data based on format.
  data.match(/^.*\*\*Returns\*\*.*\n/gm).forEach((line) => {
    commandHelps.push(line.substring(
      line.indexOf("*"),
      line.lastIndexOf(".") + 1
    ).replace('*', ''));
  });

  return commandHelps;
}