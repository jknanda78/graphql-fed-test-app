import userResolver from "./resolvers/user";
import createUserResolver from "./resolvers/createUser";

const resolvers = {
  Query: {
    user: userResolver,
  },
  Mutation: {
    createUser: createUserResolver,
  },
};

export default resolvers;