import getArticles from "@articles-subgraph/datasource/getArticles";
import chalk from "chalk";

/**
 * Resolver for fetching a single article by its ID.
 *
 * @param {any} parent - The parent resolver result.
 * @param {any} args - The arguments passed to the resolver.
 * @param {any} context - The context shared across all resolvers.
 * @param {any} info - Information about the execution state of the query.
 * @returns {any} - The article data.
 */
const articlesResolver = async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<any> => {
    console.log(chalk.bgRed("articles-subgraph::articlesResolver:::"));
    const articles = await getArticles();
    return {
      error: null,
      data: articles,
    };
  };
  
  export default articlesResolver;
  