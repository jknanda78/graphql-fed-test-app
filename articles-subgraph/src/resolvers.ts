import articleResolver from "./resolvers/articleResolver";
import createArticleResolver from "./resolvers/createArticleResolver";

const resolvers = {
  Query: {
    article: articleResolver,
  },
  Mutation: {
    createArticle: createArticleResolver,
  },
};

export default resolvers;