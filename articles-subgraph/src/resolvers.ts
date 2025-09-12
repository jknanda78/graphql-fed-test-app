import articlesResolver from "@articles-subgraph/resolvers/articlesResolver";
import createArticleResolver from "@articles-subgraph/resolvers/createArticleResolver";
import articleResolver from "@articles-subgraph/resolvers/articleResolver";
import userArticlesResolver from "@articles-subgraph/resolvers/userArticlesResolver";
import getUserById from "@user-subgraph/datasource/getUserById";

const resolvers: any = {
  Query: {
    articles: articlesResolver,
    article: articleResolver,
  },
  User: {
    articles: userArticlesResolver,
    fullName: (user: any, context: any, info: any) => {
      console.log(`${user.firstName} ${user.lastName}`);
      return `${user.firstName} ${user.lastName}`;
    },
  },
  Article: {
    user: (article: any, context: any, info: any) => {
      return getUserById(article.userId);
    },
  },
  Mutation: {
    createArticle: createArticleResolver,
  },
};

export default resolvers;