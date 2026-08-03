import { db } from "../db/client.js";
import { projectsTable } from "../db/schema.js";
import type { CreateProjectInput } from "../domain/project.types.js";

export async function createProject(input: CreateProjectInput) {
  const [project] = await db
    .insert(projectsTable)
    .values({
      name: input.name,
    })
    .returning();

  return project;
}
