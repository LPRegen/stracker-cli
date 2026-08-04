import { Command } from "commander";
import { createTaskCommand } from "./create.js";

export const taskCommand = new Command("task").description("Manage tasks");

taskCommand.addCommand(createTaskCommand);
