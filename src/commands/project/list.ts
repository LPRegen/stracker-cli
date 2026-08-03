import { Command, Argument } from "commander";
import { listProjects } from "../../repositories/project.repository.js";
import { getEmptyMessage, logProjects } from "./utils.js";
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

    logProjects(projects);
  });
