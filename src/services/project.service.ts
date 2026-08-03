import { createProject } from "../repositories/project.repository.js";
import type { CreateProjectInput } from "../domain/project.types.js";

export async function createProjectService(input: CreateProjectInput) {
  const name = input.name.trim();

  if (name.length === 0) {
    throw new Error("Project name cannot be empty.");
  }

  return createProject({ name });
}
