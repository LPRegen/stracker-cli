import { Command, InvalidOptionArgumentError } from "commander";
import { parseInstant, parsePositiveInteger } from "@/utils/parser.js";
import { updateSession } from "@/services/session.service.js";
import type { UpdateSessionInput } from "@/domain/session.types.js";

export const updateSessionCommand = new Command("update")
  .description("Update a specified session")
  .argument("<session-id>", "ID of the session to update", parsePositiveInteger)
  .option(
    "-t, --task-id <task-id>",
    "New task id to which the session will be associated",
    parsePositiveInteger,
  )
  .option("--started-at <date>", "New session start date", parseInstant)
  .option("--ended-at <date>", "New session end date", parseInstant)
  .option("-c, --comment <comment>", "New session comment")
  .option("--clear-comment", `Set session's comment to 'null'`)
  .action(async (sessionId, options) => {
    const { clearComment, ...optionsData } = options;
    if (options.comment !== undefined && options.clearComment) {
      throw new InvalidOptionArgumentError(
        "Use either `--comment` or `--clear-comment`, not both.",
      );
    }

    const data: UpdateSessionInput = optionsData;

    if (clearComment) {
      data.comment = null;
    }

    const targetSession = await updateSession({ sessionId, data });
  });
