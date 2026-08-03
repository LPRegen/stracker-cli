import { Command } from "commander";
import { createProjectCommand } from "./create.js";
import { listProjectsCommand } from "./list.js";
import { archiveProjectCommand } from "./archive.js";

export const projectCommand = new Command("project").description(
  "Manage projects",
);

projectCommand.addCommand(createProjectCommand);
projectCommand.addCommand(listProjectsCommand);
projectCommand.addCommand(archiveProjectCommand);
