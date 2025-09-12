import createUserResolver from "./resolvers/createUser";
import getUserById from "./datasource/getUserById";
import userResolver from "./resolvers/user";

const resolvers = {
  Query: {
    user: userResolver,
  },
  User: {
    __resolveReference: async(user: any, context: any, info: any) => {
      return getUserById(user.id);
    },
  },
  Mutation: {
    createUser: createUserResolver,
  },
};

export default resolvers;