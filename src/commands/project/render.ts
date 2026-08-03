import { createTable } from "../../utils/table.js";
import type { projectsTable } from "../../db/schema.js";

export function logProjects(projects: (typeof projectsTable.$inferSelect)[]) {
  const table = createTable(["ID", "Name", "Description", "Archived"]);

  const rows = projects.map((project) => [
    project.id,
    project.name,
    project.description ?? "-",
    project.archivedAt ? "✓" : "",
  ]);

  table.push(...rows);
  console.log(table.toString());
}
