import articlesResolver from '@articles-subgraph/resolvers/articlesResolver';
import createArticleResolver from '@articles-subgraph/resolvers/createArticleResolver';
import articleResolver from '@articles-subgraph/resolvers/articleResolver';
// import userArticlesResolver from "@articles-subgraph/resolvers/userArticlesResolver";
import userResolver from '@articles-subgraph/resolvers/userResolver';
import chalk from 'chalk';

const resolvers: any = {
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
