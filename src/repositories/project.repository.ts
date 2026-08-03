import { db } from "../db/client.js";
import { projectsTable } from "../db/schema.js";
import type {
  CreateProjectInput,
  ListProjectFilter,
} from "../domain/project.types.js";
import { isNull, isNotNull, eq, and } from "drizzle-orm";

export async function createProject(input: CreateProjectInput) {
  const [project] = await db
    .insert(projectsTable)
    .values({
      name: input.name,
    })
    .returning();

  return project;
}

export async function listProjects(filter: ListProjectFilter) {
  const query = db.select().from(projectsTable);

  switch (filter) {
    case "active":
      return query
        .where(isNull(projectsTable.archivedAt))
        .orderBy(projectsTable.createdAt)
        .all();

    case "archived":
      return query
        .where(isNotNull(projectsTable.archivedAt))
        .orderBy(projectsTable.createdAt)
        .all();

    case "all":
      return query.all();

    default:
      throw new Error(`Invalid project filter: ${filter}`);
  }
}

export async function findProjectById(id: number) {
  const [project] = await db
    .select({ id: projectsTable.id, name: projectsTable.name })
    .from(projectsTable)
    .where(eq(projectsTable.id, id));
  return project;
}

export async function archiveProject(id: number) {
  const [project] = await db
    .update(projectsTable)
    .set({ archivedAt: new Date() })
    .where(and(eq(projectsTable.id, id), isNull(projectsTable.archivedAt)))
    .returning();

  return project;
}
