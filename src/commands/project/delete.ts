import {
  deleteProject,
  findProjectById,
} from "@/repositories/project.repository.js";
import { Command, InvalidArgumentError } from "commander";

export const deleteProjectCommand = new Command("delete")
  .description("Delete project")
  .argument("<id>", "Project ID", (value) => {
    const id = Number(value);

    if (Number.isNaN(id)) {
      throw new InvalidArgumentError("Project ID must be a number");
    }

    return id;
  })
  .action(async (id) => {
    const project = await deleteProject(id);

    if (project) {
      console.log(`Project "${project.name} deleted successfully`);
      return;
    }
    const existing = await findProjectById(id);

    if (!existing) {
      console.log(`Project with ID "${id}" does not exist`);
      return;
    }
  });
