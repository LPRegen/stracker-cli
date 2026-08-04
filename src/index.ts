import { Command } from "commander";
import { projectCommand } from "./commands/project/index.js";
import { taskCommand } from "./commands/task/index.js";
const program = new Command();

program
  .name("stracker")
  .description("Track your work across sessions")
  .version("0.0.1");

program.addCommand(projectCommand);
program.addCommand(taskCommand);

program.parse();
