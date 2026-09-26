import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { taskPriorities, taskStatuses } from "../domain/task.constants.js";

const now = sql`(strftime('%s', 'now'))`;

export const projectsTable = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Business fields
  name: text("name").notNull(),
  description: text("description"),

  // Lifecycle
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(now),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(now)
    .$onUpdate(() => new Date()),
  archivedAt: integer("archived_at", { mode: "timestamp" }),
});

export const tasksTable = sqliteTable(
  "tasks",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    // Relationships
    projectId: integer("project_id")
      .notNull()
      .references(() => projectsTable.id, { onDelete: "cascade" }),

    // Business fields
    name: text("name").notNull(),
    description: text("description"),
    status: text("status", {
      enum: taskStatuses,
    })
      .notNull()
      .default("not started"),
    priority: text("priority", {
      enum: taskPriorities,
    })
      .notNull()
      .default("b"),

    // Lifecycle
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(now),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(now)
      .$onUpdate(() => new Date()),
    completedAt: integer("completed_at", { mode: "timestamp" }),

    // Planning
    estimatedEndDate: integer("estimated_end_date", { mode: "timestamp" }),
    estimatedDurationMinutes: integer("estimated_duration_minutes"),
  },
  (table) => [index("project_idx").on(table.projectId)],
);

export const sessionsTable = sqliteTable(
  "sessions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    // Relationships
    taskId: integer("task_id")
      .notNull()
      .references(() => tasksTable.id, { onDelete: "cascade" }),

    // Business fields
    comment: text("comment"),

    // Lifecycle
    startedAt: integer("started_at", { mode: "timestamp" })
      .notNull()
      .default(now),
    endedAt: integer("ended_at", { mode: "timestamp" }),
  },
  (table) => [index("task_idx").on(table.taskId)],
);
