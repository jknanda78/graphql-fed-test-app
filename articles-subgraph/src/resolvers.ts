import articleResolver from "./resolvers/articleResolver";
import createArticleResolver from "./resolvers/createArticleResolver";

const resolvers: any = {
  Query: {
    article: articleResolver,
  },
  User: {
    __resolveReference: (user: any) => {
      return {...user, articles: []}
    },
  },
  Mutation: {
    createArticle: createArticleResolver,
  },
};

export default resolvers;