import { connection } from '@tools/connection';
import { User, UserTable } from '@user-subgraph/types';
import { GraphQLError } from 'graphql';
import chalk from 'chalk';

/**
 * Returns the user table from the database connection.
 * @returns The user table.
 */
const getUsersTable = () => connection.table<UserTable>('user');

/**
 * Fetches a user by its ID.
 * @param id - The ID of the user to fetch.
 * @returns A promise that resolves to the user object or undefined if not found.
 */
const getUserById = async (id: string): Promise<any> => {
  const user = await getUsersTable().where('userId', id).first();

  if (user) {
    console.log(chalk.bgGrey('user-subgraph::getUserById resolver:::'), user);
    return {
      id,
      email: user.emailId,
      createdAt: user.createdAt,
      name: { firstName: user.firstName, lastName: user.lastName },
    };
  }

  throw new GraphQLError('User not found', {
    extensions: {
      code: 'USER_NOT_FOUND',
    },
  });
};

export default getUserById;
