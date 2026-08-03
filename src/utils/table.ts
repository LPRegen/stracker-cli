import Table from "cli-table3";

export function createTable(headers: string[]) {
  return new Table({
    head: headers,
    style: {
      head: ["green"],
    },
  });
}
