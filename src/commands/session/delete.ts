import { Command } from "commander";
import { deleteSession } from "@/services/session.service.js";
import { parsePositiveInteger } from "@/utils/parser.js";

export const deleteSessionCommand = new Command("delete")
  .description("Delete a session")
  .argument("<id>", "ID of the session to delete")
  .action(async (id) => {
    const session = await deleteSession(parsePositiveInteger(id));
    if (session) console.log(`Deleted session #${session.id}`);
  });
