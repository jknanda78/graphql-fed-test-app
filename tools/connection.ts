import knex from "knex";

/**
 * Establishes a connection to the database using Knex.
 */
export const connection = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data/db.sqlite3",
  },
  useNullAsDefault: true,
  debug: true, // Enable query logging
  log: {
    warn(message) {
      console.warn("[db warn]", message);
    },
    error(message) {
      console.error("[db error]", message);
    },
    deprecate(message) {
      console.warn("[db deprecate]", message);
    },
    debug(message) {
      console.log("[db]", message);
    },
  },
});
