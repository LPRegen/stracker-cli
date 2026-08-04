import type { ListProjectFilter } from "../../domain/project.types.js";

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
