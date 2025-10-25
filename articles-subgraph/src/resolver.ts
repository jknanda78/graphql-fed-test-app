import articlesResolver from '@articles-subgraph/resolvers/articlesResolver';
import createArticleResolver from '@articles-subgraph/resolvers/createArticleResolver';
import articleResolver from '@articles-subgraph/resolvers/articleResolver';
// import userArticlesResolver from "@articles-subgraph/resolvers/userArticlesResolver";
import userResolver from '@articles-subgraph/resolvers/userResolver';
import chalk from 'chalk';

const resolvers: any = {
  ArticleInterface: {
    __resolveType: (obj: any, contextValue: any, info: any) => {
      console.log(chalk.bgCyan('articles-subgraph::ArticleInterface:__resolveType::resolver:::'), obj);
      if (obj.user) {
        return 'Author';
      }
      if (obj.reviews) {
        return 'Reviews';
      }
      return undefined;
    },
  },
  ResponseInterface: {
    __resolveType: (obj: any, contextValue: any, info: any) => {
      console.log(chalk.bgBlackBright('articles-subgraph::ResponseInterface:__resolveType::resolver:::'), obj);
      if (obj) {
        return 'ArticleById';
      }
      return undefined;
    },
  },
  Query: {
    articles: articlesResolver,
    article: articleResolver,
  },
  Article: {
    user: userResolver,
  },
  User: {
    // articles: userArticlesResolver,
    fullName: (parent: any, args: any, context: any, info: any) => {
      console.log(chalk.bgCyan('articles-subgraph::User:fullName::resolver:::'), parent);
      return `${parent.name.firstName} ${parent.name.lastName}`;
    },
  },
  Mutation: {
    createArticle: createArticleResolver,
  },
};

export default resolvers;
