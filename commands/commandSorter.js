// FILE TO HANDLE COMMAND TYPE SORTING

export default function getCommandType(command) {
    console.log(command);
    command = String(command);
    command = command.toLowerCase();
    if (command == "dino") {
        return "dino";
    } else if (command.startsWith("dino")) {
        return "dino";
    } else if (["breakfast", "brunch", "lunch", "dinner"].includes(command)) {
        return "dino";
    } else {
        return "unknown";
    }
}