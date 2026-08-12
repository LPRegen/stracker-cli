import { Command } from "commander";
import { startSessionCommand } from "./start.js";

export const sessionCommand = new Command("session").description(
  "Manage sessions",
);

sessionCommand.addCommand(startSessionCommand);
