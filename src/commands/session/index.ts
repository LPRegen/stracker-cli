import { Command } from "commander";
import { startSessionCommand } from "./start.js";
import { currentSessionCommand } from "./current.js";

export const sessionCommand = new Command("session").description(
  "Manage sessions",
);

sessionCommand.addCommand(startSessionCommand);
sessionCommand.addCommand(currentSessionCommand);
