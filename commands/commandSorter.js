// FILE TO HANDLE COMMAND TYPE SORTING

export default function getCommandType(command) {
    command = String(command);
    command = command.toLowerCase();
    if (command == "dino") {
        return "dino";
    } else if (command.startsWith("dino")) {
        return "dino";
    } else if (command in ["breakfast", "brunch", "lunch", "dinner"]) {
        return "dino";
    } else {
        return "unknown";
    }
}