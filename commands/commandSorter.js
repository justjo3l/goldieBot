// FILE TO HANDLE COMMAND TYPE SORTING

export default function getCommandType(command) {
    if (command.toLowerCase() == "dino") {
        return "dino";
    } else if (command.toLowerCase().startsWith("dino")) {
        return "dino";
    } else if (command.toLowerCase() in ["breakfast", "brunch", "lunch", "dinner"]) {
        return "dino";
    } else {
        return "unknown";
    }
}