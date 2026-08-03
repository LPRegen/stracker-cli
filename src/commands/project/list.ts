import { Command, Argument } from "commander";
import { listProjects } from "../../repositories/project.repository.js";
import { getEmptyMessage } from "./utils.js";
import type { ListProjectFilter } from "../../domain/project.types.js";

export const listProjectsCommand = new Command("list")
  .description("List projects")
  .addArgument(
    new Argument("[filter]", "Project filter")
      .choices(["active", "archived", "all"])
      .default("active"),
  )
  .action(async (filter: ListProjectFilter) => {
    const projects = await listProjects(filter);

    if (projects.length === 0) {
      console.log(getEmptyMessage(filter));
      return;
    }

    console.log("\x1b[32mProjects:\x1b[0m");
    for (const project of projects) {
      console.log(project.name);
    }
  });
