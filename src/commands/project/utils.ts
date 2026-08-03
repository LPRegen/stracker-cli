import type { ListProjectFilter } from "../../domain/project.types.js";
import type { projectsTable } from "../../db/schema.js";

export function getEmptyMessage(filter: ListProjectFilter) {
  switch (filter) {
    case "archived":
      return "There are no archived projects";

    case "active":
      return "There are no active projects";
    case "all":
      return "There are no projects";
  }
}

export function logProjects(projects: (typeof projectsTable.$inferSelect)[]) {
  console.log("\x1b[32mProjects:\x1b[0m");
  for (const project of projects) {
    console.log(project.name);
  }
}
