import getArticlesById from "@articles-subgraph/datasource/getArticlesById";

/**
 * Resolver for fetching a single article by its ID.
 *
 * @param {any} parent - The parent resolver result.
 * @param {any} args - The arguments passed to the resolver.
 * @param {any} context - The context shared across all resolvers.
 * @param {any} info - Information about the execution state of the query.
 * @returns {Promise<{}>} - The article data.
 */
const articleResolver = async (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<any> => {
    return getArticlesById(args.articleId);
  };
  
  export default articleResolver;
  