import createUserResolver from './resolvers/createUser';
import getUserById from './datasource/getUserById';
import userResolver from './resolvers/user';
import chalk from 'chalk';

const resolvers = {
  UserGraphQLResponse: {
    __resolveType: (obj: any) => {
      if (obj.error) {
        return 'Error';
      }
      return 'User';
    },
  },
  Query: {
    user: userResolver,
  },
  User: {
    __resolveReference: async (args: any, context: any, info: any) => {
      console.log(chalk.bgGrey('user-subgraph::__resolveReference resolver:::'), args, context);
      return await getUserById(args.id);
    },
  },
  Mutation: {
    createUser: createUserResolver,
  },
};

export default resolvers;
