export default function replaceNewLine(str) {
    str.trim().replace(/\\n/g, "\n\n");
}

export function calculateTime(d, offset) {

    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    let nd = new Date(utc + (3600000*offset));

    return nd;
}