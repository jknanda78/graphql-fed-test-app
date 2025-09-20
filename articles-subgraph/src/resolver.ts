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
    fullName: (parent: any, args: any, context: any, info: any) => {
      console.log("articles-subgraph::User:fullName::resolver:::", parent);
      return `${parent.name.firstName} ${parent.name.lastName}`;
    },
  },
  Article: {
    user: (parent: any, args: any, context: any, info: any) => {
      console.log("articles-subgraph::Article:user::resolver:::", parent);
      return getUserById(parent.userId);
    },
  },
  Mutation: {
    createArticle: createArticleResolver,
  },
};

export default resolvers;