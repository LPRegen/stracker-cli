import { Command } from "commander";
import { createProjectCommand } from "./create.js";

export const projectCommand = new Command("project").description(
  "Manage projects",
);

projectCommand.addCommand(createProjectCommand);
