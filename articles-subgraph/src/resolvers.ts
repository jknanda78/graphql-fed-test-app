import articlesResolver from "@articles-subgraph/resolvers/articlesResolver";
import createArticleResolver from "@articles-subgraph/resolvers/createArticleResolver";
import articleResolver from "@articles-subgraph/resolvers/articleResolver";
import getArticlesByUserId from "@articles-subgraph/data-access/getArticlesByUserId";
import { User } from "@articles-subgraph/types";

const resolvers: any = {
  Query: {
    articles: articlesResolver,
    article: articleResolver,
  },
  User: {
    __resolveReference: (user: User) => {
      return { articles: getArticlesByUserId(user.id) };
    },
  },
  Mutation: {
    createArticle: createArticleResolver,
  },
};

export default resolvers;