import { connection } from "@tools/connection";
import { User, UserTable } from "@user-subgraph/types";
import { Message } from "@user-subgraph/types";

/**
 * Returns the articles table from the database connection.
 * @returns The articles table.
 */
const getUsersTable = () => connection.table<UserTable>("user");

/**
 * Fetches a user by its ID.
 * @param id - The ID of the user to fetch.
 * @returns A promise that resolves to the user object or undefined if not found.
 */
const getUserById = async (id: string): Promise<User|Message> => {
  const user = await getUsersTable().where("userId", id).first();

  if (user) {
    return {id, email: user.email, name: user.name, createdAt: user.createdAt };
  }

  return {msg: "User not found", error: true, code: "USER_NOT_FOUND"};
};

export default getUserById;