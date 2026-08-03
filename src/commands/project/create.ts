import { Command } from "commander";
import { createProjectService } from "../../services/project.service.js";

export const createProjectCommand = new Command("create")
  .description("Create new project")
  .argument("<name>", "Project name")
  .action(async (name: string) => {
    await createProjectService({ name });
    console.log(`Project "${name}" created`);
  });
