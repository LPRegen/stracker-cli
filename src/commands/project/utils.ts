import type { ListProjectFilter } from "../../domain/project.types.js";
import type { projectsTable } from "../../db/schema.js";
import { createTable } from "../../utils/table.js";

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
  const table = createTable(["ID", "Name", "Description", "Archived"]);

  for (const project of projects) {
    table.push([
      project.id,
      project.name,
      project.description ?? "-",
      project.archivedAt ? "✓" : "",
    ]);
  }
  console.log(table.toString());
}
