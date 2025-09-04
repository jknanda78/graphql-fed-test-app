import { connection } from "@tools/connection";
import { v4 as uuid } from "uuid";
import { Message } from "@user-subgraph/types";

/**
 * Returns the articles table from the database connection.
 * @returns The articles table.
 */
const getUsersTable = () => connection.table<{}>("user");

/**
 * Create a user by email.
 * @param userInput - The user email and name.
 * @returns A promise that resolves to the user object or undefined if not found.
 */
const createUserByEmail = async (userInput: {email: string, name: string}): Promise<Message> => {
  const user = await getUsersTable().where("email", userInput.email).first();
  console.log({user});
  if (!user) {
    await getUsersTable().insert({
      userId: uuid(),
      email: userInput.email,
      name: userInput.name,
      createdAt: new Date().toISOString(),
    });
    return {msg: "User created successfully", error: false, code: "SUCCESS"};
  }
  return {msg: "User already exists", error: true, code: "USER_ALREADY_EXISTS"};
};

export default createUserByEmail;