import { Command } from "commander";
import { createTaskCommand } from "./create.js";
import { listTasksCommand } from "./list.js";

export const taskCommand = new Command("task").description("Manage tasks");

taskCommand.addCommand(createTaskCommand);
taskCommand.addCommand(listTasksCommand);
