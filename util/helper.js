// FILE TO CONTAIN HELPER FUNCTIONS FOR THE BOT

// Function to replace the database weird \\n occurence with \n\n
export default function replaceNewLine(str) {
    str = str.trim().replace(/\\n/g, "\n\n");
    return str;
}

// Function to calculate the days from a date based on timezone offset
export function calculateTime(d, offset) {

    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    let nd = new Date(utc + (3600000*offset));

    return nd;
}

// Function to get the days from a date based on 21-day cycle
export function getDaysFromDate(date) {

    // Gets current time with 10-hour offset (GMT+10)
    date = calculateTime(new Date(date), 10);

    // Gets date of 29th May 2023 with 10-hour offset (GMT+10)
    let compareDate = calculateTime(new Date("05/29/2023"), 10);

    // Gets difference between days and gets remainder of 21-day cycle
    let days = Math.floor((date - compareDate) / (1000 * 60 * 60 * 24));
    days =  days % 21;

    // Gets time for further message processing
    let time = date.getHours() * 100 + date.getMinutes();

    // Returns array of days and time
    return [days, time];
}

function sleep(ms) {
    return new Promise((resolve) => setInterval(resolve, ms));
    
}

export async function wait(ms) {
    console.log('Waiting for ' + String(ms) + 'ms...');
    await sleep(ms);
    console.log(String(ms) + 'ms have passed.');
}