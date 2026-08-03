import { Command, InvalidArgumentError } from "commander";
import {
  archiveProject,
  findProjectById,
} from "../../repositories/project.repository.js";

export const archiveProjectCommand = new Command("archive")
  .description("Archive project")
  .argument("<id>", "Project ID", (value) => {
    const id = Number(value);

    if (Number.isNaN(id)) {
      throw new InvalidArgumentError("Project ID must be a number");
    }

    return id;
  })
  .action(async (id) => {
    const project = await archiveProject(Number(id));

    if (project) {
      console.log(`Project "${project.name}" archived`);
      return;
    }
    const existing = await findProjectById(id);

    if (!existing) {
      console.log(`Project with id "${id}" does not exist`);
      return;
    }

    console.log(`Project "${existing.name}" is already archived`);
  });
