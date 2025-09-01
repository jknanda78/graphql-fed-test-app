import { connection } from "@tools/connection";

/**
 * Returns the articles table from the database connection.
 * @returns The articles table.
 */
const getUsersTable = () => connection.table<{}>("user");

/**
 * Fetches a user by its ID.
 * @param id - The ID of the user to fetch.
 * @returns A promise that resolves to the user object or undefined if not found.
 */
const getUserById = async (id: string): Promise<{} | undefined> => {
  const user = await getUsersTable().where("userId", id).first();
  return {...user, id: user.userId };
};

export default getUserById;